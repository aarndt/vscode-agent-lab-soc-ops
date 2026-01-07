# Copilot Instructions for Soc Ops

Social bingo game for in-person mixers: tap squares matching people, get 5-in-a-row to win.

## Development Checklist
- [ ] `npm run lint` (ESLint: React, TypeScript, hooks)
- [ ] `npm run test` (Vitest unit tests)
- [ ] `npm run build` (TypeScript + Vite)
- [ ] Game state persists in localStorage

## Architecture

**Three layers**: Components (`src/components/`) → Game Logic (`src/utils/bingoLogic.ts`) → State (`src/hooks/useBingoGame.ts`)

**State flow**: `'start'` → `'playing'` → `'bingo'` → reset
- `useBingoGame` hook = single source of truth
- `generateBoard()` creates 25 squares (24 shuffled questions + center free space)
- `toggleSquare()` + `checkBingo()` after each click
- Uses `queueMicrotask` to batch state updates on win (prevents stale state)

**localStorage persistence**:
- Validates schema on load (version, gameState, board structure)
- SSR-safe (`typeof window` guards)
- Auto-clears invalid data

## Critical Patterns

**Immutability**: Always return new arrays/objects — `toggleSquare()` maps board, never mutates
**Free space**: Center square (id=12) always marked, can't be toggled
**Win detection**: Returns first match only (row → column → diagonal priority)
**Types**: `BingoSquareData` (id, text, isMarked, isFreeSpace), `BingoLine` (type, index, squares[])

## Stack

- **Tailwind v4**: `@import 'tailwindcss'` in `src/index.css`, custom tokens via `@theme` (no config file)
- **Testing**: Vitest + React Testing Library, mock Math.random for deterministic shuffles
- **Deployment**: Auto-deploys to GitHub Pages on `main` push, base path from `VITE_REPO_NAME` env var
- **Questions**: Edit `src/data/questions.ts` (24 strings + `FREE_SPACE`), shuffled by Fisher-Yates
