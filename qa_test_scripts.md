# QA Test Scripts for Oakmont VoIP + CRM

These scripts cover core call flows, HUD performance and logging behaviours across supported platforms (Windows, macOS, iOS, Android) and network conditions.

## Test Case 1: Outbound Call Connect Time
- **Scenario:** Agent places an outbound call from the dialer.
- **Devices/Browsers:** Windows (Chrome/Edge), macOS (Chrome/Safari), iOS Safari, Android Chrome.
- **Network Conditions:** Office LAN, home Wi‑Fi, 4G, 5G.
- **Steps:**
  1. Open the `/dialer` in the CRM.
  2. Grant microphone access if prompted and wait for the “Ready” badge.
  3. Search for a test contact and click “Call”.
  4. Measure the time between clicking “Call” and hearing ringback.
- **Expected Result:** Ringback tone should start within 3 seconds. HUD bars remain green.

## Test Case 2: HUD Response to Network Jitter
- **Scenario:** Call quality HUD should reflect network jitter and display appropriate tooltips.
- **Devices/Browsers:** Windows (Chrome), macOS (Chrome), Android Chrome.
- **Network Conditions:** Simulate jitter using network throttling or switching between Wi‑Fi and mobile data.
- **Steps:**
  1. Initiate a call and verify HUD bars are green.
  2. Introduce jitter spikes (e.g. vary RTT to 400 ms or jitter to 100 ms).
  3. Observe HUD colours and tooltips within 6 seconds.
- **Expected Result:** HUD bars turn amber/red based on thresholds; tooltip suggests remedies (e.g. “Move closer to router”). When network stabilises, bars return to green within 6 seconds.

## Test Case 3: Connectivity Loss and Recovery
- **Scenario:** Mid‑call network drop and reconnection.
- **Steps:**
  1. Start a call and verify audio is clear.
  2. Disable network connection for 10 seconds then re‑enable.
  3. Observe call state and HUD during and after drop.
- **Expected Result:** Call should not crash; audio resumes once network is back. HUD reflects loss and recovery appropriately.

## Test Case 4: Call Logging and AI Summary Upload
- **Scenario:** Completed call should generate logs and AI summary in Supabase.
- **Steps:**
  1. Complete a call with dispositions.
  2. After hang‑up, navigate to call logs in the CRM.
  3. Check Supabase `call_logs` table for the new entry and `summaries` table for AI summary.
- **Expected Result:** Log entry appears within 60 seconds with accurate metadata; AI summary is associated with the call.

## Test Case 5: Disposition and Follow‑Up Flow
- **Scenario:** Agent selects call disposition and follow‑up tasks without errors.
- **Steps:**
  1. After call ends, choose a disposition and add follow‑up notes.
  2. Save the disposition.
  3. Verify that follow‑up task is created in CRM.
- **Expected Result:** No UI errors; follow‑up appears in tasks list; call record shows disposition and notes.
