# YCDO Website Monorepo

Monorepo scaffold for the YCDO website platform.

## Tech Stack

- Frontend: React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- Backend: NestJS + TypeScript + MongoDB (Mongoose)
- Shared: TypeScript interfaces/DTOs package for cross-app typing

## Workspace Structure

- `apps/frontend` - Public website and admin dashboard frontend
- `apps/backend` - NestJS API backend
- `packages/shared` - Shared interfaces and DTO contracts

## Getting Started

1. Install dependencies from the repository root:
   - `npm install`
2. Copy environment template:
   - `cp .env.example .env` (or create `.env` manually on Windows)
3. Start frontend:
   - `npm run dev:frontend`
4. Start backend:
   - `npm run dev:backend`

## Scripts

- `npm run dev:frontend` - Run Vite development server
- `npm run dev:backend` - Run Nest development server
- `npm run build` - Build frontend and backend
- `npm run lint` - Lint frontend and backend
