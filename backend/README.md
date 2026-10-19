# FixTrack Backend

Repair job tracker API for mobile repair shops. Express + TypeScript + MongoDB (Mongoose).

## Setup

```bash
cp .env.example .env   # fill in DATABASE_URL, ACCESS_TOKEN_SECRET, ANTHROPIC_API_KEY
npm install
npm run dev            # http://localhost:5000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the API with reload |
| `npm run build` / `npm start` | Compile to `dist/` and run it |
| `npm test` | Status transition tests + API tests on an in-memory MongoDB |
| `npm run evaluate` | Run the AI category evaluation (15 complaints, calls the Claude API) |

## Structure

```
src/
  apis/
    Auth/        auth_{controller,model,route,service,types,validate}.ts
    Job/         job_{controller,model,route,service,types,validate}.ts
                 job_status.ts  (status order rules)  job_code.ts  (FX-1234 codes)
    Suggestion/  suggestion_{controller,route,service,types,validate}.ts
  providers/anthropic/anthropic.client.ts
  middleware/    asyncWrapper, validateRequest, verifyToken, middleware, routeMiddleware
  utils/         globalErrorHandler, sendResponse, Queries, hashText, logger
  DefaultConfig/ config.ts (statuses, categories, patterns), checkEnv.ts
  app.ts  index.ts  evaluateSuggestion.ts
```

## API

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| POST | `/auth/sign-up` | - | Create a shop owner account |
| POST | `/auth/sign-in` | - | Log in, returns a token |
| GET | `/auth/profile` | owner | Logged-in owner |
| POST | `/auth/logout` | - | Clear the login cookie |
| POST | `/job/create` | owner | Create a job (code and `Received` status are set by the server) |
| GET | `/job/get-all?page=&search=&status=` | owner | The owner's own jobs, paginated |
| PATCH | `/job/update/:id` | owner | Edit job details (not status or code) |
| PATCH | `/job/update-status/:id` | owner | Body `{ status }`; must be the next step |
| GET | `/job/track/:code` | public | Returns only `job_code`, `status`, `updatedAt` |
| POST | `/suggestion/repair` | owner | Body `{ complaint }`; returns `{ category, likely_fault }` |

## Business rules

- Status order: **Received → Diagnosing → Repairing → Ready → Delivered**. A job can only move to the next status. Skipping a step or going back returns `409`. The update only applies if the job is still in the status that was checked, so two clicks at once cannot skip a step.
- Each job gets a random code like `FX-1042`. The code is unique in the database, and the server retries if a code is already taken.
- Owners only see and edit their own jobs. Another owner's job id returns `404`.
- The public lookup never returns the customer's name, phone, device or cost, and it is rate limited.
- Validation: phone numbers are 7–15 digits (an optional `+`; spaces, dashes and brackets are removed), estimated cost must be greater than 0, and text fields have length limits.

## AI feature: complaint → category

When the owner types a complaint, `POST /suggestion/repair` asks Claude (`claude-opus-5-5`, low effort, structured output) for:

- **category**: one of `screen`, `battery`, `water damage`, `software`, `charging port`
- **likely_fault**: one short sentence for the technician

The dashboard fills in both fields and shows a notice saying they must be checked. The owner can change them before saving.

- **Input:** complaint text (5–1000 characters)
- **Output:** `{ category, likely_fault }`. The category is checked against the allowed list by the structured output schema.
- **Limitations:** the suggestion can be wrong or vague, especially for short complaints or ones with several faults ("dropped in water and now won't charge"). It is never saved without the owner confirming it. If the API is unavailable, the endpoint returns `503` and the owner picks the category by hand.
- **Settings:** `ANTHROPIC_API_KEY`, optional `ANTHROPIC_MODEL`. Refused requests fall back to another model server-side (`fallbacks: "default"`).

### Evaluation

`npm run evaluate` sends the 15 complaints in `src/evaluateSuggestion.ts` (3 per category) and counts correct categories.

| Run date | Model | Correct categories | Notes |
| --- | --- | --- | --- |
| Pending | claude-opus-5-5 | Pending / 15 | Fill in after running `npm run evaluate` |
