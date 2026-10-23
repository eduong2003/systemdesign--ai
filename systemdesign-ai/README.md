# SystemDesign AI

A practice-first system design learning platform built with Next.js App Router, TypeScript, React, Tailwind CSS, a shadcn-style Button primitive (Radix Slot + CVA), and Lucide icons.

## Run locally

Requires Node.js 22.18+ and npm.

```powershell
cd "C:\Users\eduon\Downloads\System Design\systemdesign-ai"
npm ci
npm run dev
```

Open http://localhost:3000. No database, account, or API key is required.

## Phase 1 features

- Responsive dark landing page with an illustrative architecture diagram.
- Eight searchable challenges with difficulty filters, requirements, constraints, hints, and topic links.
- Text workspace with explicit draft saving, submission validation, and a self-review checklist.
- Ten introductory lessons with examples, tradeoffs, and related challenges.
- Browser-local dashboard showing saved attempts, submitted challenges, lesson progress, recent challenge activity, and a recommended next challenge.
- Loading, error, empty, and 404 states; keyboard focus indicators and semantic controls.
- AI Tutor route clearly indicates Phase 2 status. Automated feedback is not implemented.

Save your draft before navigating away. Data stays in this browser's localStorage, is not synchronized between devices, and is lost when site data is cleared. Submitted means you submitted a design, not that it was evaluated or correct. Editing and saving a submitted design as a draft returns it to draft status.

## Architecture and Next.js concepts

```text
src/app/                 Routes, shared layout, and error/loading boundaries
src/app/problems/[slug]/ Individual challenge route
src/app/learn/[slug]/    Individual lesson route
src/components/         Reusable navigation, cards, filters, workspace, dashboard
src/components/ui/      Button primitive with shadcn conventions
src/lib/data.ts         Typed local challenge and lesson content
src/lib/progress.ts     Validated browser storage and reactive progress store
tests/                  Browser acceptance tests
```

**Server components:** Pages render content from local TypeScript data. A folder containing page.tsx becomes a route: app/problems/page.tsx is /problems. The [slug] folder captures a URL segment, so /problems/url-shortener selects that challenge. generateStaticParams prepares the known pages during builds; unknown slugs use notFound(). Route params are awaited.

**Client components:** Navigation reads the active route; problem filters use React state; the workspace, dashboard, and lesson button use browser storage. The "use client" directive allows state, event handlers, and browser APIs. useSyncExternalStore provides consistent storage subscriptions without hydration mismatch.

**Communication:** Server pages pass typed content as props to interactive components. Phase 1 has no application API requests: progress is stored in the browser. In Phase 2 a server route will validate tutor requests and call OpenAI using a server-only environment variable. Keeping content on the server and interactivity in small client components reduces shipped JavaScript and makes database migration straightforward.

The home architecture is an illustrative diagram, not a drag-and-drop editor. Authentication, PostgreSQL/Prisma, saved server submissions, and React Flow remain Phase 3.

## Validation

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

The browser suite runs the production server on port 3100 and verifies saved drafts, submission validation, dashboard updates, lesson persistence, filters, mobile overflow, and unknown challenge routes. Run build first. To serve the production application manually: npm run build then npm start.

## GitHub

Create an empty GitHub repository without generating a README, then run from this project directory:

```sh
git init
git add .
git commit -m "Build SystemDesign AI Phase 1 MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/systemdesign-ai.git
git push -u origin main
```

The supplied .gitignore excludes dependencies, build output, environment files, browser reports, and local runtime state. Review staged files before committing. No remote repository or deployment was created by this implementation.

## Vercel

After pushing, import the GitHub repository into Vercel. Select Next.js as the framework, use the repository root as the project root (or systemdesign-ai if you commit the parent directory), keep the default install/build/output settings, and deploy. No environment variables are needed for Phase 1. Vercel handles Next.js routing and production hosting.

Next phases: add a validated server-side AI endpoint with usage safeguards; then add authentication, PostgreSQL/Prisma, saved submissions, and architecture diagrams.

## Dependency audit

Runtime dependency audit is clean at implementation time. npm audit reports five high-severity findings in the development-only ESLint dependency chain through braces. The current registry does not offer a patched braces version; npm's proposed forced fix downgrades Next's lint configuration to version 14. Do not use npm audit fix --force blindly. Recheck the audit when updating dependencies.
