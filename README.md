# Tic Tac Toe

A two-player Tic Tac Toe game built with **React** and **Vite**. It has a dark theme, a start screen where you choose X or O, winning-line highlights, and a translucent result overlay when a round ends.

## Features

- Choose X or O on the start screen (the symbol you pick plays first)
- Turn-by-turn play with a live "Next Player" status
- Win detection across all 8 lines, with the three winning cells highlighted
- Draw detection when the board is full
- Translucent, blurred result overlay with **Play again** and **Change symbol** buttons
- Restart and change symbol at any time during a game
- Responsive board that fits small screens

## Tech stack

- [React](https://react.dev/) (function components and the `useState` hook)
- [Vite](https://vite.dev/) (dev server and build tool)
- Plain CSS (one stylesheet per component)

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (a current LTS version) and npm

### Install and run

```bash
# 1. Create a Vite + React project (skip if you already have one)
npm create vite@latest tic-tac-toe -- --template react
cd tic-tac-toe

# 2. Copy the contents of this project's "src" folder into your project's "src" folder
#    (replace existing files when asked)

# 3. Install dependencies and start the dev server
npm install
npm run dev
```

Open the local address that Vite prints in the terminal (usually `http://localhost:5173`).

### Other scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Creates an optimized production build in `dist/` |
| `npm run preview` | Serves the production build locally |

## How to play

1. On the start screen, pick **X** or **O**. That symbol plays first.
2. Players take turns clicking empty squares.
3. The first player to get three in a row (horizontal, vertical or diagonal) wins.
4. If all nine squares are filled and nobody has three in a row, it is a draw.
5. When the round ends, an overlay appears. Choose **Play again** (same starting symbol) or **Change symbol** (back to the start screen).

## Project structure

```
src/
├── main.jsx                      Entry point, renders <App />
├── index.css                     Global styles and dark background
├── App.jsx                       Page title and the game
├── App.css                       Page layout
├── utils/
│   └── calculateWinner.js        Checks the 8 winning lines
└── components/
    ├── Board/
    │   ├── Board.jsx             Game state and logic
    │   └── Board.css             Board, status and button styles
    ├── square/
    │   ├── Square.jsx            A single clickable cell
    │   └── square.css            Cell styles (X, O and winning colors)
    ├── StartScreen/
    │   ├── StartScreen.jsx       "Choose your symbol" screen
    │   └── StartScreen.css
    └── ResultModal/
        ├── ResultModal.jsx       Win/draw overlay
        └── ResultModal.css
```

> Folder names are case-sensitive in imports: `Board`, `StartScreen` and `ResultModal` start with a capital letter, while `square` is lowercase.

## How it works

### Component tree

```
App
└── Board
    ├── StartScreen      (shown while no symbol has been chosen)
    ├── Square × 9       (the cells)
    └── ResultModal      (shown when the game is over)
```

### State (in `Board.jsx`)

| State | Type | Purpose |
|---|---|---|
| `firstPlayer` | `null`, `"X"` or `"O"` | The chosen starting symbol. While it is `null`, the start screen is shown. |
| `squares` | array of 9 items | The board. Each item is `null`, `"X"` or `"O"`. Index 0 is the top-left cell and index 8 is the bottom-right. |
| `xIsNext` | boolean | `true` when it is X's turn. |

### Derived values (calculated on every render, not stored)

| Value | How it is calculated |
|---|---|
| `result` | `calculateWinner(squares)`, which returns `{ player, line }` or `null` |
| `winner` | `result.player`, or `null` |
| `winningLine` | `result.line`, or `[]` |
| `isDraw` | No winner and every square is filled |
| `gameOver` | A winner exists or it is a draw |

### Data flow

- **Down:** `Board` passes `value`, `isWinning` and `onSquareClick` to each `Square` as props.
- **Up:** clicking a square calls `onSquareClick`, which runs `handleClick(index)` in `Board`. That function copies the array, places the symbol, and updates state, so React redraws the board.

## Customizing

- **Colors:** the palette lives in the CSS files. X is `#38bdf8`, O is `#fb7185`, and the winning highlight is `#34d399`. Search for these values and change them.
- **Board size:** change `width: min(22rem, 90vw)` in `Board.css`.
- **Overlay delay:** change the `0.8s` in the `animation` lines of `ResultModal.css`.

## Ideas for next steps

- Score counter that tracks wins across rounds
- Play against the computer
- Move history with undo