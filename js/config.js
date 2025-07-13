// Game Configuration
const CONFIG = {
    // Canvas dimensions
    GAME_WIDTH: 800,
    GAME_HEIGHT: 600,
    
    // Reel settings
    REELS: 5,
    ROWS: 3,
    
    // Symbol dimensions
    SYMBOL_WIDTH: 100,
    SYMBOL_HEIGHT: 100,
    SYMBOL_PADDING: 5,
    
    // Asset paths
    ASSETS: {
        HV1: 'assets/hv1_symbol.png',
        HV2: 'assets/hv2_symbol.png',
        HV3: 'assets/hv3_symbol.png',
        HV4: 'assets/hv4_symbol.png',
        LV1: 'assets/lv1_symbol.png',
        LV2: 'assets/lv2_symbol.png',
        LV3: 'assets/lv3_symbol.png',
        LV4: 'assets/lv4_symbol.png',
        SPIN_BUTTON: 'assets/spin_button.png'
    },
    
    // Reelset configuration
    REELSET: {
        BAND_1: ["hv2", "lv3", "lv3", "hv1", "hv1", "lv1", "hv1", "hv4", "lv1", "hv3", "hv2", "hv3", "lv4", "hv4", "lv1", "hv2", "lv4", "lv1", "lv3", "hv2"],
        BAND_2: ["hv1", "lv2", "lv3", "lv2", "lv1", "lv1", "lv4", "lv1", "lv1", "hv4", "lv3", "hv2", "lv1", "lv3", "hv1", "lv1", "lv2", "lv4", "lv3", "lv2"],
        BAND_3: ["lv1", "hv2", "lv3", "lv4", "hv3", "hv2", "lv2", "hv2", "hv2", "lv1", "hv3", "lv1", "hv1", "lv2", "hv3", "hv2", "hv4", "hv1", "lv2", "lv4"],
        BAND_4: ["hv2", "lv2", "hv3", "lv2", "lv4", "lv4", "hv3", "lv2", "lv4", "hv1", "lv1", "hv1", "lv2", "hv3", "lv2", "lv3", "hv2", "lv1", "hv3", "lv2"],
        BAND_5: ["lv3", "lv4", "hv2", "hv3", "hv4", "hv1", "hv3", "hv2", "hv2", "hv4", "hv4", "hv2", "lv2", "hv4", "hv1", "lv2", "hv1", "lv2", "hv4", "lv4"]
    },
    
    // Paylines
    PAYLINES: [
        // Line 1: Middle row
        [
            {row: 1, col: 0},
            {row: 1, col: 1},
            {row: 1, col: 2},
            {row: 1, col: 3},
            {row: 1, col: 4}
        ],
        // Line 2: Top row
        [
            {row: 0, col: 0},
            {row: 0, col: 1},
            {row: 0, col: 2},
            {row: 0, col: 3},
            {row: 0, col: 4}
        ],
        // Line 3: Bottom row
        [
            {row: 2, col: 0},
            {row: 2, col: 1},
            {row: 2, col: 2},
            {row: 2, col: 3},
            {row: 2, col: 4}
        ],
        // Line 4: Top left to bottom right
        [
            {row: 0, col: 0},
            {row: 0, col: 1},
            {row: 1, col: 2},
            {row: 2, col: 3},
            {row: 2, col: 4}
        ],
        // Line 5: Bottom left to top right
        [
            {row: 2, col: 0},
            {row: 2, col: 1},
            {row: 1, col: 2},
            {row: 0, col: 3},
            {row: 0, col: 4}
        ],
        // Line 6: V shape
        [
            {row: 0, col: 0},
            {row: 1, col: 1},
            {row: 2, col: 2},
            {row: 1, col: 3},
            {row: 0, col: 4}
        ],
        // Line 7: Inverted V shape
        [
            {row: 2, col: 0},
            {row: 1, col: 1},
            {row: 0, col: 2},
            {row: 1, col: 3},
            {row: 2, col: 4}
        ]
    ],
    
    // Paytable
    PAYTABLE: {
        "hv1": {3: 10, 4: 20, 5: 50},
        "hv2": {3: 5, 4: 10, 5: 20},
        "hv3": {3: 5, 4: 10, 5: 15},
        "hv4": {3: 5, 4: 10, 5: 15},
        "lv1": {3: 2, 4: 5, 5: 10},
        "lv2": {3: 1, 4: 2, 5: 5},
        "lv3": {3: 1, 4: 2, 5: 3},
        "lv4": {3: 1, 4: 2, 5: 3}
    }
}; 