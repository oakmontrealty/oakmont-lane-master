import express from "express";
import { config } from "./config.js";
import { readDoc, appendToDoc } from "./google.js";
import { extractTasksFromDoc } from "./parser.js";
import { sendToLane } from "./openaiClient.js";
import { log } from "./logger.js";

const app = express();
app.get("/health", (req, res) => res.json({ ok: true }));

let lastHash = "";
let sent = new Set(); // naive memory of sent tasks

function hash(s) {
  let h = 0, i = 0, len = s.length;
  while (i < len) h = (h << 5) - h + s.charCodeAt(i++) | 0;
  return String(h);
}

async function pollOnce() {
  try {
    const data = await readDoc();
    const body = (data.body?.content || [])
      .map(x => x.paragraph?.elements?.map(e => e.textRun?.content || "").join("") || "")
      .join("");
    const h = hash(body);
    if (h === lastHash) return;
    lastHash = h;

    const tasks = extractTasksFromDoc(body);
    let routed = 0;
    for (const t of tasks) {
      const key = `${t.lane}::${t.text}`;
      if (sent.has(key)) continue;
      await sendToLane(t.lane, `New task from Lane Master: ${t.text}`);
      sent.add(key);
      routed++;
    }
    if (routed > 0) {
      const now = new Date().toLocaleString("en-AU", { timeZone: config.timezone });
      await appendToDoc(`Lane Master update ${now}: routed ${routed} task(s).`);
    }
  } catch (err) {
    log.error({ err }, "Poll failed");
  }
}

setInterval(pollOnce, config.pollMs);
pollOnce();

app.listen(config.port, () => {
  log.info({ port: config.port }, "Lane Master running");
});
