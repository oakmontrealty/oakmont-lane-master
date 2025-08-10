import OpenAI from "openai";
import { config } from "./config.js";
import { log } from "./logger.js";

let client;
export function getOpenAI() {
  if (!client) {
    client = new OpenAI({ apiKey: config.openaiKey });
  }
  return client;
}

// Simple sender which posts to a specific thread or starts a new one with a lane tag
export async function sendToLane(lane, message) {
  const client = getOpenAI();
  const threadId = config.lanes[lane];
  if (!threadId) {
    log.warn({ lane }, "No thread id configured for lane");
    return;
  }
  // Using Assistants v2 style thread messages
  await client.beta.threads.messages.create(threadId, {
    role: "user",
    content: message
  });
  log.info({ lane }, "Posted message to lane thread");
}
