# User Guide – Oakmont VoIP + CRM Dialer

This guide helps agents use the Oakmont VoIP + CRM dialer, interpret the quality HUD and leverage AI summaries.

## Introduction
Brief overview of the dialer capabilities (in-browser calls, real-time transcription, HUD, AI summaries).

## Getting Started
1. Open the dialer at `/dialer` and sign in.
2. Grant microphone permission when prompted.
3. Wait for the **Ready** badge to appear (all quality metrics green).

## Placing Calls
1. Search or select a contact.
2. Click **Call** and wait for ringback.
3. Speak normally; the HUD monitors RTT, jitter and packet loss.

## Interpreting the Quality HUD
- **Green:** Good connection.
- **Amber:** Minor issues; move closer to router or use wired headset.
- **Red:** Poor connection; check network, reduce bandwidth use.
- Tooltips provide suggested actions for each condition.

## AI Call Summaries
After each call, the system generates a summary with highlights and action items. Edit or append notes before saving to the CRM.

## Dispositions and Follow‑Ups
Select a call disposition, add notes and create follow‑up tasks. Ensure tasks are saved in the CRM before closing.

## Troubleshooting
- No audio: check mic permissions and reload page.
- HUD not green: check network or change connection.
- Token expired: refresh the page to retrieve a new token.
