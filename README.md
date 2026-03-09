# AI Resume Optimizer

An AI-powered web application that analyzes resumes and provides actionable feedback to improve job application success rates.

## Demo

Live Demo: 

![Demo GIF]

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Zustand
- React Hook Form
- Playwright (E2E Testing)
- Vitest + Testing Library

## Features

- Multi-step resume input form
- Global state management with Zustand
- AI powered feedback simulation
- Responsive UI
- Loading skeletons
- Toast notifications
- Unit tests
- End-to-end tests

## Architecture

src
 ┣ components
 ┣ hooks
 ┣ store
 ┣ lib
 ┗ tests

 ## Installation

git clone https://github.com/afraalmaci/ai-resume-optimizer

cd ai-resume-optimizer

npm install

npm run dev

## Testing

Run unit tests

npm run test

Run E2E tests

npx playwright test

## Future Improvements

- OpenAI integration
- Resume PDF upload
- ATS score system
- Authentication
- Resume export