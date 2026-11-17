# Pakistan Search Repository Details

## Overview

This repository, `babar12300/pakistan-search`, is a search engine for Pakistan developed by `@ast`. It is a modern web application built as a front-end search experience with a curated data model and client-side search logic.

## Repository Information

- Repository name: `pakistan-search`
- Full name: `babar12300/pakistan-search`
- Description: `a search engine of Pakistan developed by @ast`
- Repository ID: `1459762016`
- Owner: `babar12300`
- Default branch: `main`
- Visibility: `Public`
- URL: `https://github.com/babar12300/pakistan-search`
- License: Not specified
- Topics: `search-console`, `search-engine`, `search-tool`
- Open issues: `1`
- Forks: `0`
- Stars: `0`
- Watchers: `0`

## Primary Programming Language

The project is primarily written in TypeScript.

Language composition:
- TypeScript: 96.9%
- CSS: 2.6%
- JavaScript: 0.5%

This confirms that TypeScript is the main programming language used across the codebase.

## Technology Stack

From the project configuration and source structure, this repository uses:

- TypeScript
- React 19
- Vite
- TanStack Start / TanStack Router
- Tailwind CSS
- Radix UI components
- Supabase client integration
- Drizzle ORM / database tooling
- Vitest for testing
- ESLint and Prettier for code quality

## Project Structure

The repository includes the following major areas:

- `src/` — application source code
- `public/` — static assets
- `supabase/` — Supabase-related setup
- `drizzle/` — schema and migration-related files
- `src/data/` — static directory data
- `src/lib/` — reusable logic such as i18n and search utilities
- `README.md` — project setup and overview
- `package.json` — project scripts and dependencies

## Project Rules Observed in the Codebase

The repo is configured to follow the project's rules:

- Directory data is stored as static bilingual content in `src/data/directory.ts`.
- Search behavior is implemented in a pure client-side function in `src/lib/search.ts`.
- UI language handling is managed through `LangProvider` in `src/lib/i18n.tsx`.
- The app uses logical spacing (`ps`, `pe`, `ms`, `me`, `start`, `end`) to support right-to-left layouts, especially for Urdu.

## Development Notes

The project was created with Lovable and includes setup instructions in the root `README.md` for local development using Node.js and npm:

```bash
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Summary

`pakistan-search` is a TypeScript-first, React-based search project focused on Pakistan-related directory and search functionality. The dominant language is TypeScript, which accounts for nearly all of the codebase, with CSS and JavaScript appearing only in small supporting roles.

## Final Answer

The main programming language used in this project is TypeScript.
