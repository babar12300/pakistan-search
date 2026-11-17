# Project Overview

## Project Name
Pakistan Search

## Repository
- Owner: `babar12300`
- Name: `pakistan-search`
- URL: `https://github.com/babar12300/pakistan-search`
- Description: `a search engine of Pakistan developed by @ast`

## Purpose
Pakistan Search is a search-and-directory web application focused on finding Pakistani websites, services, news, institutions, and places. It provides a curated catalog of Pakistan-related entries rather than indexing the entire web like a general-purpose search engine.

The project is designed to help users browse Pakistani resources in a structured way. Each directory entry can include a title, URL, category, city, English and Urdu metadata, and tags. The app organizes content into categories such as news, government, education, travel, shopping, finance, telecom, sports, health, and culture.

This makes the platform useful for users looking for Pakistani websites, institutions, services, or places in a clean, searchable interface.

## Main Objective
The main objective of the project is to make Pakistan-related online resources easier to discover and search. It combines a searchable directory, category browsing, modern UI design, and bilingual support to serve users in both English and Urdu.

## Key Features
- Search-focused user experience for Pakistan-related websites and services
- Curated directory of Pakistani resources with category and city metadata
- Home page with popular search suggestions and category browsing
- English and Urdu interface support
- Right-to-left (RTL) layout support for Urdu
- Relevance-based scoring in search results
- Client-side search normalization for Urdu and Arabic variants
- Support for discovered catalog entries merged with the built-in directory
- Shareable search URLs using query parameters
- Responsive and modern user interface

## Technology Stack
This project uses a modern frontend stack, including:

- TypeScript — primary application language
- React 19 — UI framework
- Vite — development and build tooling
- TanStack Start and TanStack Router — app framework and routing
- TanStack Query — data loading and caching
- Tailwind CSS — styling system
- Radix UI and UI component libraries — accessible interface primitives
- Supabase and Drizzle tooling — data integration and database-related setup
- Vitest and Testing Library — testing framework
- ESLint and Prettier — code quality and formatting

## Language Composition
The repository is primarily built with TypeScript.

GitHub language composition:

- TypeScript: 96.9%
- CSS: 2.6%
- JavaScript: 0.5%

This means TypeScript is the main programming language used in the codebase. CSS is used for styling, and JavaScript is present in a minor supporting role.

## Architecture Overview
The project follows a modern frontend architecture based on route-driven pages and a reusable catalog/search model:

1. Route files in `src/routes` define the main pages.
2. The home page (`/`) loads catalog data and displays a search box and category cards.
3. The search page (`/search`) reads query parameters such as `q` and `cat`.
4. The catalog query loads the catalog and merges built-in entries with discovered ones.
5. The search logic normalizes text, tokenizes search terms, and scores matches across multiple fields.
6. The language provider manages English and Urdu output and updates the document direction.
7. UI components render results, categories, and language toggles for the user.

This separation keeps the app maintainable: page routes, reusable catalog logic, data, and UI rendering are handled independently.

## Project Structure
The repository includes these major areas:

- `src/` — application source code
- `src/routes/` — page routes and app shell
- `src/lib/` — shared logic such as search, catalog, and localization
- `src/data/` — structured directory data
- `src/components/` — reusable UI components
- `public/` — static assets
- `supabase/` — Supabase integration-related files
- `drizzle/` — schema and database tooling
- `README.md` — setup and basic project instructions
- `package.json` — scripts and dependencies
- `roadmap.md` — project roadmap and future goals

## Development Workflow and Setup Notes
The project uses a standard Node.js + npm workflow.

```bash
git clone https://github.com/babar12300/pakistan-search.git
cd pakistan-search
npm install
npm run dev
```

Useful commands include:

```bash
npm run build
npm run preview
npm run lint
npm test
```

The repository also includes a `bun.lock` file, but the project README specifically documents npm-based development. The project’s `AGENTS.md` also warns against editing Lovable-managed database files and automatically generated files, which helps preserve generated and managed system state.

## Summary
Pakistan Search is a TypeScript-first web application aimed at making Pakistan-related web resources easier to discover and search. It combines a curated Pakistani directory, bilingual support, modern React architecture, and search ranking logic into a clean, user-friendly experience. The codebase is primarily TypeScript-based, with CSS used for styling and JavaScript appearing only in small supporting amounts.
