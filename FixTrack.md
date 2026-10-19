# FixTrack: Repair Job Tracker for Mobile Repair Shops

## Problem

Small phone repair shops give customers a paper slip. Customers then call or visit again and again to ask "is my phone ready?" Slips get lost, and shops forget what they promised.

FixTrack lets the shop record and update repair jobs, and lets customers check their repair status online with a job code.

## Tables

### User (shop owner)
- Name
- Email
- Password (hashed)

### Job
- Customer name
- Customer phone
- Device
- Problem
- Category (AI-suggested, editable)
- Estimated cost
- Status
- Job code (e.g. FX-1042)
- Belongs to a User

## Pages

1. **Login**
2. **Shop dashboard**: list of jobs, form to add a job, button to update status
3. **Public status page**: the customer enters their job code and sees the status (no login needed)

## Business Logic

- A job moves through: **Received → Diagnosing → Repairing → Ready → Delivered**
- A job cannot skip steps or go backwards
- Each job gets a short code automatically (e.g. FX-1042)

## Security

- Only the logged-in shop owner can create or edit their jobs
- The public page shows only the status, never the customer's phone number
- Input validation: phone format, and estimated cost must be greater than 0

## AI Feature

When the shop types the customer's complaint (e.g. "phone fell in water, screen flickers"), an LLM API suggests:

- **Problem category**: screen, battery, water damage, software, or charging port
- **Likely fault**

The shop owner can accept or change the suggestion.

- **Input:** complaint text
- **Output:** category and likely fault
- **Limitations:** the suggestion can be wrong or vague, so the shop owner always confirms it
- **Evaluation:** test on about 15 complaints, count how many categories were correct, and record the result in the README

## Testing

One test for status transitions:
- Valid moves pass
- Skipping a step or going backwards fails
