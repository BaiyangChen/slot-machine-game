# Slot Machine Game – PixiJS Project

This is a web-based slot machine game built using [PixiJS](https://pixijs.com/). The game simulates a 5-reel, 3-row slot system with multiple paylines, a paytable-based reward system, and responsive resizing.

---

## Features

- 5 reels, 3 rows configuration
- 7 unique paylines (horizontal, diagonal, V-shape)
- Payout logic based on symbol and occurrence (3/4/5 matches)
- Preloading screen with loading percentage
- Fully responsive (resizes canvas and text automatically)
- Modular code: `config`, `preloader`, `SlotMachine`, `main`

---


## How the Game Works

1. **Preloader** loads all images from the `assets/` folder and shows "Loading: XX%".
2. When loading is complete, the game is initialized and displayed in the browser.
3. Clicking the **spin button** triggers a randomization of each reel using pre-defined reel sets.
4. After spinning, the game evaluates all **7 paylines** and calculates the total payout using the `PAYTABLE`.
5. Win information is displayed below the reels.

---

## Configuration Overview (`config.js`)

- `REELS`: 5  
- `ROWS`: 3  
- `SYMBOL_WIDTH`: 100px  
- `PAYLINES`: 7 (including diagonals and V-shapes)  
- `PAYTABLE`: defines rewards for 3/4/5 identical symbols (HV = High Value, LV = Low Value)

---

## How to Run

Because this project loads assets dynamically, it must be served via a local server.  
You can use either of the following methods:

### Option 1: Live Server (VS Code Plugin)

1. Install the "Live Server" plugin in VS Code  
2. Right-click `index.html` → **Open with Live Server**

### Option 2: Python (if installed)

```bash
python -m http.server
# Then open http://localhost:3000 in your browser

