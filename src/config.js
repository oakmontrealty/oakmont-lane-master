import 'dotenv/config';

export const config = {
  docId: process.env.GOOGLE_DOC_ID,
  pollMs: Number(process.env.POLL_MS || 180000),
  timezone: process.env.TIMEZONE || "Australia/Sydney",
  openaiKey: process.env.OPENAI_API_KEY,
  lanes: {
    B: process.env.LANE_B_THREAD,
    C: process.env.LANE_C_THREAD,
    D: process.env.LANE_D_THREAD,
  },
  port: Number(process.env.PORT || 8787),
  gcpKeyPath: process.env.GOOGLE_APPLICATION_CREDENTIALS || "./gcp-service-account.json",
};
