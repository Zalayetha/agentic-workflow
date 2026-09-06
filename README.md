# Assignment 1 - AI Product Engineer Devscale

TypeScript examples for building AI product workflows with `@anvia/core`, `@anvia/openai`, and `@anvia/studio`.

The project demonstrates three pipeline patterns:

- **Ticket Triage**: extracts structured ticket metadata from raw support text, then routes the ticket based on priority.
- **Article Refiner**: drafts, critiques, and rewrites an article through a multi-step pipeline exposed in Anvia Studio.
- **Idea Review Board**: fans a startup pitch out to CEO, CTO, and market analyst reviewers, then merges their perspectives into a final verdict.

## Tech Stack

- TypeScript
- Node.js
- pnpm
- `@anvia/core`
- `@anvia/openai`
- `@anvia/studio`
- Zod for schemas
- dotenv for environment variables

## Requirements

- Node.js installed
- pnpm `11.24.0`
- OpenAI-compatible API key

## Setup

Install dependencies:

```bash
pnpm install
```

Create a `.env` file:

```bash
OPENAI_API_KEY=your_api_key_here
OPENAI_BASE_URL=your_base_url_here
```

`OPENAI_BASE_URL` is optional if your Anvia/OpenAI client configuration does not require a custom endpoint.

## Running Examples

Run the ticket triage pipeline:

```bash
pnpm exec tsx src/ticket-triage/index.ts
```

Run the startup idea review board:

```bash
pnpm exec tsx src/idea-review-board/index.ts
```

Run the article refiner Studio app:

```bash
pnpm exec tsx src/article-refiner/index.ts
```

## Project Structure

```text
src/
  model.ts
  ticket-triage/
    index.ts
    service.ts
    types.ts
  article-refiner/
    index.ts
    service.ts
  idea-review-board/
    index.ts
    review-pipeline.ts
    service.ts
    types.ts
```

## Notes

- The shared model client is configured in `src/model.ts`.
- All examples currently use the `gpt-5.6-luna` model ID.
- The default `npm test` script is still a placeholder and does not run automated tests.
