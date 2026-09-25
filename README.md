# Gaming Roulette

Deciding what to play should not take longer than playing it.
Gaming Roulette lets everyone add their picks and leaves the decision to a spin.

[Open Gaming Roulette](https://prettycoffee.github.io/gaming-roulette/)

## How it works

Add your players, fill in their game lists and set the rules.
Choose how many games each person can submit and whether duplicates are allowed,
then spin to pick your next game.

An adjustable handicap reduces a player's chances after consecutive wins.
You can also switch between several picker views.

Keep a history of the games you play, with ratings and playtime for each player.
Your players, rules, settings and game history are saved locally in your browser.

## Run locally

Install Node.js and pnpm, then clone the repository:

```sh
git clone https://github.com/PrettyCoffee/gaming-roulette.git
cd gaming-roulette
pnpm install
pnpm dev
```

Open http://localhost:1420.

## Desktop app

Gaming Roulette can also be used as a desktop app through Tauri.
You will need Rust and the platform dependencies described in the
[Tauri v1 prerequisites](https://v1.tauri.app/v1/guides/getting-started/prerequisites).

Start desktop development:

```sh
pnpm tauri:dev
```

Build the desktop app:

```sh
pnpm tauri:build
```

## Development

Built with React, TypeScript, Vite and Tailwind CSS, with Tauri for the desktop app.

Check the code with ESLint:

```sh
pnpm lint
```

Typecheck and build the browser app:

```sh
pnpm build
```

The browser build is written to `dist`.
