import { google } from "googleapis";
import fs from "fs/promises";
import { config } from "./config.js";
import { log } from "./logger.js";

let auth;
export async function getAuth() {
  if (auth) return auth;
  const credentials = JSON.parse(await fs.readFile(config.gcpKeyPath, "utf8"));
  const scopes = ["https://www.googleapis.com/auth/documents"];
  const jwt = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    scopes
  );
  await jwt.authorize();
  auth = jwt;
  return auth;
}

export async function readDoc() {
  const docs = google.docs({ version: "v1", auth: await getAuth() });
  const res = await docs.documents.get({ documentId: config.docId });
  return res.data;
}

export async function appendToDoc(text) {
  const docs = google.docs({ version: "v1", auth: await getAuth() });
  // Append at end of document
  await docs.documents.batchUpdate({
    documentId: config.docId,
    requestBody: {
      requests: [
        { insertText: { location: { index: 1e9 }, text: "\n" + text + "\n" } }
      ]
    }
  });
  log.info("Wrote summary line back to doc");
}
