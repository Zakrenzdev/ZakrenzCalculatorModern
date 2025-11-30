Here’s a clean, straight-to-the-point **README.md** you can drop into your repo. English, modern, no fluff.

---

# Modern Calculator (Next.js)

A minimal, responsive calculator UI with **Standard** and **Scientific** features, built on **Next.js + TypeScript + Tailwind + shadcn/ui + lucide-react**. Created to feel sleek and focused for everyday math.

> Bootstrapped with `create-next-app` (Next.js) — default dev workflow applies. ([GitHub][1])

## Features

* **Core math:** `+  −  ×  ÷`, decimal, percentage `%`, toggle sign `±`, exponent `xʸ`
* **Scientific set:** `√` (square root), `x²`, `sin`, `cos`, `tan`, `log`, `ln`
* **Modes:** Standard, Scientific (Programmer mode placeholder)
* **Precision control:** choose decimal places (0 / 2 / 4 / 6)
* **History:** shows last 10 calculations, quick clear
* **Copy result:** one-click copy to clipboard
* **About dialog & tips:** small UX niceties
* **Keyboard-ready (light):** numeric entry and basic ops are straightforward to extend

> The project already includes **shadcn/ui** setup (`components.json`) so UI parts are plug-and-play. ([GitHub][1])

## Tech Stack

* **Next.js** (App Router) + **React**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui** components (Select, DropdownMenu, Dialog, Alert, Button, Badge)
* **lucide-react** icons

## Getting Started

Clone and install:

```bash
git clone https://github.com/Hizkia178/Calculator-Modern
cd Calculator-Modern
npm install
```

Run the dev server:

```bash
npm run dev
# or: yarn dev / pnpm dev / bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view. The page hot-reloads on edit. ([GitHub][1])

## Project Structure (high level)

```
.
├─ public/                # static assets
├─ src/
│  ├─ app/                # Next.js App Router pages
│  │  └─ ...             # main calculator screen and routes
│  ├─ components/         # (if any local ui wrappers)
│  └─ styles/             # global styles (via Tailwind)
├─ components.json        # shadcn/ui registry config
├─ next.config.ts         # Next.js config
├─ tailwind/postcss config
└─ package.json
```

> You’ll see standard `create-next-app` scripts (`dev`, etc.) and Next/font (Geist) optimizations in the default scaffold. ([GitHub][1])

## UI/UX Notes

* **Operators** use a strong style (`bg-foreground`, subtle lift on hover)
* **Numbers** are clean/flat; fill on hover for feedback
* **Display** uses `tabular-nums` for aligned digits
* **History** is scrollable with quick clear
* **Responsive** up to mobile widths (grid keypad, compact controls)

## Extending

* **Keyboard shortcuts:** add a keydown listener to map `Enter` → `=`, `Backspace` → delete, `c` → clear, etc.
* **Programmer mode:** add hex/dec/bin toggles, bitwise ops, word size selection.
* **Memory ops:** M+, M−, MR, MC buttons with a small store.
* **Unit/percent helpers:** “quick presets” (×2, ÷2, 10%, 15%, …).
* **Tests:** add unit tests for calc engine (edge cases like divide by 0, precision rounding).

## Contributing

1. Fork the repo
2. Create a feature branch (`feat/…`)
3. Commit with clear messages
4. Open a PR

## License

Add a license of your choice (MIT recommended). If you include a `LICENSE` file, mention it here
