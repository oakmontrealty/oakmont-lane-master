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


## Test Case 6: Preflight Readiness and "Ready" Badge
- **Scenario:** The dialer should display a "Ready" badge only after microphone permission is granted, a Twilio token is retrieved, and network metrics (RTT, jitter, packet loss) remain green for 5 seconds.
- **Devices/Browsers:** Windows (Chrome/Edge), macOS (Chrome/Safari), iOS Safari, Android Chrome.
- **Network Conditions:** Stable network (office LAN, 5G).
- **Steps:**
  1. Open the `/dialer` page in the CRM.
  2. Deny microphone permission when prompted; verify that the "Ready" badge does not appear.
  3. Grant microphone permission and wait for the token to be retrieved.
  4. Observe HUD bars for 5 seconds and confirm all metrics stay in the green range.
  5. Confirm that the "Ready" badge appears and remains while metrics are green; simulate packet loss or jitter spikes and confirm the badge disappears.
- **Expected Result:** The "Ready" badge appears only when all metrics are green and disappears immediately when any metric turns amber/red.

## Test Case 7: HUD Tooltip Suggestions
- **Scenario:** When network metrics degrade, the HUD should display context‑sensitive tooltips with recommended actions.
- **Devices/Browsers:** Windows (Chrome), macOS (Safari), Android Chrome.
- **Network Conditions:** Introduced jitter spikes or packet loss.
- **Steps:**
  1. Start a call and verify HUD bars
  2. 
  are green.
  3. Use a network shaping tool to introduce jitter (e.g., 80 ms) or packet loss (e.g., 5 %).
  4. Observe the HUD tooltip and note any guidance provided (e.g., "Move closer to router", "Switch to wired headset").
  5. Return network conditions to normal and confirm the t
  6.
  7. ooltip disappears.
- **Expected Result:** The HUD displays appropriate tooltips when metrics are amber/red and clears them when metrics return to green.

## Test Case 8: AI Summary Accuracy
- **Scenario:** Evaluate the quality and completeness of AI-generated call summaries.
- **Devices/Browsers:** Windows (Chrome), macOS (Safari), iOS Safari, Android Chrome.
- **Network Conditions:** Stable network connection.
- **Steps:**
  1. Place a call and conduct a conversation with specific points to be summarized.
  2. End the call and wait for the AI summary to appear.
  3. Review the AI-generated summary for accuracy, completeness, and correct tagging.
- **Expected Result:** AI summary correctly captures key discussion points, names, action items, and any call disposition notes.

## Test Case 9: Multi-Agent Campaign Flow
- **Scenario:** Ensure call routing and HUD performance during multi-agent outbound campaigns.
- **Devices/Browsers:** Windows (Chrome), macOS (Chrome), iOS Safari, Android Chrome.
- **Network Conditions:** Stable network; simulate moderate call load.
- **Steps:**
  1. Launch a campaign with multiple agents logged into the dialer.
  2. Monitor call assignment, queue behavior, and HUD metrics for each agent.
  3. Perform dispositions and follow-ups after each call.
- **Expected Result:** Calls are evenly distributed; HUD metrics update per agent; call logs and dispositions recorded without race conditions.

## Test Case 10: CRM Integration and Follow-up Task Creation
- **Scenario:** Validate CRM integration for follow-up tasks and record syncing.
- **Devices/Browsers:** Windows (Edge), macOS (Safari), iOS Safari, Android Chrome.
- **Network Conditions:** Stable network connection.
- **Steps:**
  1. After completing a call, select a disposition that triggers a follow-up task.
  2. Verify that a corresponding task is created in the CRM with correct due date and assignee.
  3. Check that call notes and AI summary are attached to the CRM record.
- **Expected Result:** Follow-up task appears in the CRM with appropriate metadata, and call notes and summaries are attached correctly.
