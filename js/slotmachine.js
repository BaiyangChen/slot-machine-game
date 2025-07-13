// Slot Machine class
class SlotMachine {
    constructor(app) {
        this.app = app;
        this.container = new PIXI.Container();
        
        this.reelsContainer = new PIXI.Container();
        this.spinButton = null;
        this.winsText = null;
        
        this.reelPositions = [0, 0, 0, 0, 0]; // Initial positions
        this.symbols = [];
        this.isSpinning = false;
        
        this.app.stage.addChild(this.container);
        this.init();
    }
    
    init() {
        this.container.position.set(
            this.app.screen.width / 2,
            this.app.screen.height / 2
        );
        this.container.pivot.set(
            CONFIG.REELS * CONFIG.SYMBOL_WIDTH / 2 + (CONFIG.REELS - 1) * CONFIG.SYMBOL_PADDING / 2,
            CONFIG.ROWS * CONFIG.SYMBOL_HEIGHT / 2
        );
        
        this.reelsContainer.position.set(0, 0);
        this.container.addChild(this.reelsContainer);
        
        this.createSymbols();
        this.createSpinButton();
        this.createWinsText();
        
        window.addEventListener('resize', this.onResize.bind(this));
        this.onResize();
    }
    
    createSymbols() {
        this.symbols = [];
        
        for (let col = 0; col < CONFIG.REELS; col++) {
            this.symbols[col] = [];
            
            for (let row = 0; row < CONFIG.ROWS; row++) {
                const symbolType = this.getSymbolType(col, row);
                
                const symbol = new PIXI.Sprite(PIXI.Assets.get(CONFIG.ASSETS[symbolType.toUpperCase()]));
                symbol.width = CONFIG.SYMBOL_WIDTH;
                symbol.height = CONFIG.SYMBOL_HEIGHT;
                symbol.position.x = col * (CONFIG.SYMBOL_WIDTH + CONFIG.SYMBOL_PADDING);
                symbol.position.y = row * CONFIG.SYMBOL_HEIGHT;
                
                this.symbols[col][row] = {
                    sprite: symbol,
                    type: symbolType
                };
                
                this.reelsContainer.addChild(symbol);
            }
        }
    }
    
    createSpinButton() {
        this.spinButton = new PIXI.Sprite(PIXI.Assets.get(CONFIG.ASSETS.SPIN_BUTTON));
        this.spinButton.width = 70;
        this.spinButton.height = 70;
        this.spinButton.anchor.set(0.5);
        this.spinButton.position.set(
            this.reelsContainer.width / 2,
            this.reelsContainer.height + 45
        );
        
        this.spinButton.eventMode = 'static';
        this.spinButton.cursor = 'pointer';
        this.spinButton.on('pointerdown', this.onSpin.bind(this));
        
        this.container.addChild(this.spinButton);
    }
    
    createWinsText() {
        this.winsText = new PIXI.Text('', {
            fontFamily: 'Arial',
            fontSize: 18,
            fill: 0xffffff,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: CONFIG.REELS * CONFIG.SYMBOL_WIDTH
        });
        
        this.winsText.anchor.set(0.5, 0);
        this.winsText.position.set(
            this.reelsContainer.width / 2,
            this.reelsContainer.height + 90
        );
        
        this.container.addChild(this.winsText);
    }
    
    getSymbolType(col, row) {
        let reelset;
        
        switch (col) {
            case 0: reelset = CONFIG.REELSET.BAND_1; break;
            case 1: reelset = CONFIG.REELSET.BAND_2; break;
            case 2: reelset = CONFIG.REELSET.BAND_3; break;
            case 3: reelset = CONFIG.REELSET.BAND_4; break;
            case 4: reelset = CONFIG.REELSET.BAND_5; break;
        }
        
        const pos = (this.reelPositions[col] + row) % reelset.length;
        return reelset[pos];
    }
    
    onSpin() {
        if (this.isSpinning) return;
        
        this.isSpinning = true;
        
        for (let i = 0; i < this.reelPositions.length; i++) {
            this.reelPositions[i] = Math.floor(Math.random() * 20);
        }
        
        this.updateSymbols();
        const wins = this.calculateWins();
        this.showWins(wins);
        
        this.isSpinning = false;
    }
    
    updateSymbols() {
        for (let col = 0; col < CONFIG.REELS; col++) {
            for (let row = 0; row < CONFIG.ROWS; row++) {
                const symbolType = this.getSymbolType(col, row);
                this.symbols[col][row].sprite.texture = PIXI.Assets.get(CONFIG.ASSETS[symbolType.toUpperCase()]);
                this.symbols[col][row].type = symbolType;
            }
        }
    }
    
    calculateWins() {
        const wins = [];
        let totalWin = 0;
        
        const screen = [];
        for (let row = 0; row < CONFIG.ROWS; row++) {
            screen[row] = [];
            for (let col = 0; col < CONFIG.REELS; col++) {
                screen[row][col] = this.symbols[col][row].type;
            }
        }
        
        CONFIG.PAYLINES.forEach((payline, paylineIndex) => {
            const symbolsOnLine = payline.map(pos => screen[pos.row][pos.col]);
            
            const firstSymbol = symbolsOnLine[0];
            let count = 1;
            
            for (let i = 1; i < symbolsOnLine.length; i++) {
                if (symbolsOnLine[i] === firstSymbol) {
                    count++;
                } else {
                    break;
                }
            }
            
            if (count >= 3) {
                const payout = CONFIG.PAYTABLE[firstSymbol][count];
                totalWin += payout;
                
                wins.push({
                    paylineId: paylineIndex + 1,
                    symbol: firstSymbol,
                    count: count,
                    payout: payout
                });
            }
        });
        
        return { total: totalWin, details: wins };
    }
    
    showWins(wins) {
        let text = '';
        
        if (wins.total > 0) {
            text = `Total Win: ${wins.total}\n`;
            
            wins.details.forEach(win => {
                text += `- Line ${win.paylineId}, ${win.symbol} x${win.count}, ${win.payout}\n`;
            });
        } else {
            text = 'Total Win: 0';
        }
        
        this.winsText.text = text;
        this.adjustTextSize();
    }
    
    adjustTextSize() {
        const maxHeight = window.innerHeight * 0.25;
        if (this.winsText.height > maxHeight) {
            const scale = maxHeight / this.winsText.height;
            this.winsText.scale.set(scale);
        } else {
            this.winsText.scale.set(1);
        }
    }
    
    onResize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        
        this.app.renderer.resize(w, h);
        
        const gameHeight = CONFIG.ROWS * CONFIG.SYMBOL_HEIGHT + 150;
        const gameWidth = CONFIG.REELS * (CONFIG.SYMBOL_WIDTH + CONFIG.SYMBOL_PADDING);
        
        const scaleX = (w * 0.85) / gameWidth;
        const scaleY = (h * 0.85) / gameHeight;
        
        const scale = Math.min(scaleX, scaleY, 0.9);
        this.container.scale.set(scale);
        this.container.position.set(w / 2, h * 0.45);
        this.adjustTextSize();
    }
} 