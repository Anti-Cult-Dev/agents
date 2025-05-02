# Agent Platform

A modern agent builder platform using Next.js, Supabase, React Flow, and MCP.

## Features
- Drag-and-drop workflow, server, and UI builders (React Flow)
- Supabase for multi-tenant backend
- Modern, beautiful UI (Tailwind CSS)
- Real-time persistence and collaboration ready

## Getting Started
1. Install dependencies: `npm install`
2. Set up `.env` and `.env.local` with Supabase keys
3. Run dev server: `npm run dev -- --turbo`

## Directory Structure
- `/app` — Next.js app routes
- `/components/builder` — Drag-and-drop builders
- `/lib` — Supabase and utility libraries
- `/stores` — Zustand state stores for builders
- `/styles` — Global CSS (Tailwind)

## Tech Stack
- Next.js 14+
- Supabase
- React Flow
- Tailwind CSS
- Zustand

## License
MIT
