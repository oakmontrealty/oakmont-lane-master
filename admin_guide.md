# Admin Guide

## User Management

- Add and remove agents, assign roles, and configure access rights within the Oakmont VoIP + CRM platform.
- Invite new agents to the dialer and CRM, and remove or disable departing agents.
- Use Twilio and Supabase admin dashboards to manage voice credentials and database permissions.

## Configuration & Secrets

- Store secrets (Twilio API keys, Supabase tokens, OpenAI keys, Google Doc IDs) as environment variables or in a secure vault.
- Rotate tokens regularly based on the schedule defined in the credential table (e.g., every 90 days for service keys). Record rotations in the master doc.
- Ensure the deployment environment (e.g., Render or Cloud Run) references secrets via environment variables and not hardcoded values.

## Monitoring & Logs

- Monitor call performance and quality via Twilio console and Supabase logs.
- Access call recordings, AI transcriptions and QA metrics in Supabase and the CRM.
- Integrate logging frameworks (such as Pino) to collect application logs and route them to central observability tools.
- Review Lane Master orchestrator logs in the Render dashboard to track task routing and update status.

## Running QA Tests

- Refer to the QA matrix and test scripts file for manual and automated tests across devices and network conditions.
- Execute test suites before each release candidate; document results and log defects in the shared doc or issue tracker.
- Coordinate with Lane A for new build artefacts and with Lane B for AI summarisation endpoints before running integration tests.
- Use the dialer and CRM UI to verify call flows, HUD updates, call logging, AI summaries and dispositions operate as expected.

## Release & Store Readiness

- Prepare App Store and Play Store listings: capture high-quality screenshots of the dialer with the quality HUD and "Ready" badge, and write marketing descriptions.
- Submit builds through TestFlight and Google Play Console, ensuring bundle identifiers and entitlements match the project.
- Review compliance with privacy notices, consent requirements and store guidelines before submission.
- Coordinate release schedule with marketing and product teams.
