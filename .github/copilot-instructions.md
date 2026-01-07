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

## Design System: Pixel Arcade Style

**Visual Theme**: Retro 80s/90s arcade cabinet aesthetic with neon glow effects, chunky borders, pixel art elements, and vibrant colors

**Color Palette** (defined in `@theme`):
- `arcade-pink` (#ff10f0): Primary neon pink for titles, accents
- `arcade-cyan` (#00f0ff): Bright cyan for text, buttons, borders
- `arcade-yellow` (#fff000): Winner/bingo state, gold elements
- `arcade-purple` (#a020f0): Cabinet/frame borders, structural elements
- `arcade-green` (#00ff41): Marked squares, success states
- `arcade-orange` (#ff6600): Accents, button borders
- `cabinet-dark` (#1a0033): Dark purple background for text on bright colors
- `cabinet-base` (#2d1b69): Main cabinet/panel background
- `screen-dark` (#0a0015): Screen/viewport background
- `coin-gold` (#ffd700): Coin slot, credit display accents

**Typography**:
- **Font**: 'Press Start 2P' (Google Fonts) — authentic 8-bit pixel font
- **Sizing**: Very small (0.45rem–0.6rem) for authentic arcade density, larger (text-xs to text-5xl) for headlines
- **Effects**: `neon-glow` class (multi-layer text-shadow), `tracking-wider`/`tracking-widest` for readability

**UI Components**:
- **Arcade buttons**: Chunky 4px borders, 3D press effect (`arcade-btn` class with shadow transform), uppercase text
- **Square tiles**: 4px borders, neon glow on marked states, star (★) checkmarks, purple base → cyan/yellow when active
- **Cabinet frame**: 8px borders, corner screw decorations, coin slot detail, neon box-shadow glow
- **Screen bezel**: Nested border frames, `scanlines` overlay (horizontal lines + animated sweep), dark inset background


**Animations** (respect `prefers-reduced-motion`):
- `pulse-glow`: 1.5s opacity pulse for buttons and lights
- `blink`: 1s step-end infinite for credit display
- `scanline`: 8s vertical sweep gradient (CRT effect)
- `twinkle`: 3s pixel stars background animation
- `arcade-btn` press: 6px translateY on `:active` with shadow reduction

**Layout Patterns**:
- **Backgrounds**: `pixel-stars` class (radial-gradient dots with twinkle), dark gradients with neon accents
- **Spacing**: Larger gaps (gap-2) between squares for chunky aesthetic vs minimal (gap-1) default
- **Overlays**: Semi-transparent dark (`bg-black/80`) for modals, bright borders with glow effects
- **Responsive**: Scales gracefully (text-3xl → text-5xl on md:), maintains pixel aesthetic at all sizes

**Accessibility**:
- All neon text has sufficient contrast against dark backgrounds
- Animations disable with `prefers-reduced-motion`
- ARIA labels preserved on interactive elements
- Focus states inherit from arcade button styling
