# Lane C Deliverables (Design / QA / Docs)

## QA Matrix (Initial Draft)

| Scenario | Device/Platform | Network Condition | Steps | Expected Outcome |
| --- | --- | --- | --- | --- |
| **Outbound call connect time** | Windows 11 – Chrome / Edge | Office LAN (stable) | Initiate an outbound call from the dialer and measure the time until ringback. | Ringback audio is heard within **≤ 3 s**; UI reflects call state correctly. |
| **HUD response to jitter spike** | macOS – Safari | 4G mobile data | Simulate a jitter spike using network shaping (e.g. 50–80 ms jitter) during a call. | The jitter bar in the HUD turns **amber** or **red** based on threshold; a tooltip suggests moving closer to the router or switching network. |
| **Loss of connectivity and recovery** | Android – Chrome | Wi‑Fi drop/reconnect | Start a call, then disable Wi‑Fi for 10 s and re‑enable it. | The call UI shows reconnecting; upon network restoration the call resumes without crash; HUD metrics reflect the disruption. |
| **Call logging and summary upload** | iOS – Safari | Home Wi‑Fi | Complete an outbound call and end it normally. | Call log appears in Supabase within **≤ 60 s**; AI summary is generated and attached to the contact record. |
| **Disposition and follow‑up** | Windows – Chrome | 5G | After finishing a call, select a disposition and schedule a follow‑up task. | The disposition is saved without errors; follow‑up is added to the CRM; UI transitions smoothly back to the dialer. |

## Dialer User Guide (Outline)

1. **Introduction** – Purpose of the Oakmont VoIP + CRM dialer and key features (in‑browser calling, real‑time transcription, HUD, AI summaries).
2. **Getting Started** – How to open the dialer, grant microphone permissions and log in.
3. **Preflight Readiness** – Explanation of the “Ready” badge: all network metrics must be green for five seconds; what to do if it’s red or amber.
4. **Placing a Call** – Searching contacts, initiating calls, understanding ringing/connected states.
5. **Interpreting the HUD** – Meaning of RTT, jitter and packet‑loss bars; tooltip messages and recommended actions for each state.
6. **AI Call Summaries** – How AI summaries are generated, where to view them, and how to edit or append notes.
7. **Dispositions and Follow‑ups** – Selecting call dispositions and creating follow‑up tasks within the CRM.
8. **Troubleshooting** – Common issues (no audio, red HUD, token expired) and steps to resolve them.

## Admin Guide (Outline)

1. **User Management** – Adding/removing agents; assigning phone numbers; managing roles and permissions.
2. **Configuration & Secrets** – Rotating Twilio/Supabase/OpenAI keys; storing them in a secure vault; updating environment variables.
3. **Monitoring & Logs** – Accessing call logs and transcriptions; interpreting HUD metrics across the organisation; exporting logs for audit.
4. **Running QA Tests** – Executing the QA matrix; capturing results; filing bugs; coordinating with Lane A for fixes.
5. **Release & Store Readiness** – Steps to package the web app for App Store/Play Store; preparing screenshots and description; complying with store policies.

## Compliance Checklist (AU Privacy Act & Store Policies)

* **Privacy Notice & Consent** – Include a clear in‑app notice that calls may be recorded and transcribed; require users to toggle consent before call recording begins.
* **Data Retention & Deletion** – Define how long call recordings and transcriptions are stored; document a process for users to request deletion of their data.
* **Data Residency** – Ensure call data and transcriptions are stored in Australia or compliant regions per the Privacy Act.
* **Security Measures** – Use encryption at rest and in transit; restrict access to recordings and logs; perform regular key rotation.
* **App Store/Play Store Compliance** – Provide accurate privacy disclosures; avoid restricted permissions; align with platform guidelines for VoIP apps.

## Credential Table (Example)

| Credential | Purpose | Owner Lane | Storage Location | Rotation Schedule |
| --- | --- | --- | --- | --- |
| `TWILIO_API_KEY` | Outbound/inbound calling via Twilio | Lane A | Vault / `.env` file | Rotate every 90 days or upon team change |
| `SUPABASE_SERVICE_KEY` | Writing call logs and summaries | Lane A | Vault / server configuration | Rotate every 60 days |
| `OPENAI_API_KEY` | AI call summarisation | Lane B | Vault / server configuration | Rotate monthly |
| `GOOGLE_DOC_ID` | Source‑of‑truth document ID | Lane C | `.env` | Static – update only if the document moves |
| `APP_STORE_CERT` | iOS app signing | Lane A | Secure signing server | Rotate annually |
