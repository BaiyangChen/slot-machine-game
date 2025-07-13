// Preloader class
class Preloader {
    constructor(app, onComplete) {
        this.app = app;
        this.onComplete = onComplete;
        this.container = new PIXI.Container();
        this.loadingText = null;
        this.assets = [];
        this.loadingProgress = 0;
        
        this.app.stage.addChild(this.container);
        window.addEventListener('resize', this.onResize.bind(this));
        this.init();
        this.onResize();
    }
    
    init() {
        this.loadingText = new PIXI.Text('Loading: 0%', {
            fontFamily: 'Arial',
            fontSize: 30,
            fill: 0xffffff,
            align: 'center'
        });
        
        this.loadingText.anchor.set(0.5);
        this.loadingText.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
        this.container.addChild(this.loadingText);
        
        for (const key in CONFIG.ASSETS) {
            this.assets.push(CONFIG.ASSETS[key]);
        }
    }
    
    load() {
        return new Promise((resolve) => {
            PIXI.Assets.init();
            const loadPromises = this.assets.map(asset => 
                PIXI.Assets.load(asset)
            );
            
            let assetsLoaded = 0;
            this.assets.forEach(asset => {
                PIXI.Assets.addBundle('bundle', { [asset]: asset });
                PIXI.Assets.loadBundle('bundle', (progress) => {
                    assetsLoaded += progress;
                    this.loadingProgress = Math.min(100, Math.floor((assetsLoaded / this.assets.length) * 100));
                    this.updateLoadingText();
                });
            });
            
            Promise.all(loadPromises)
                .then(() => {
                    this.loadingProgress = 100;
                    this.updateLoadingText();
                    
                    setTimeout(() => {
                        this.app.stage.removeChild(this.container);
                        window.removeEventListener('resize', this.onResize.bind(this));
                        resolve();
                    }, 500);
                });
        });
    }
    
    updateLoadingText() {
        this.loadingText.text = `Loading: ${this.loadingProgress}%`;
    }
    
    onResize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        
        this.app.renderer.resize(w, h);
        
        if (this.loadingText) {
            this.loadingText.position.set(w / 2, h / 2);
            const fontSize = Math.min(Math.max(w / 20, 20), 36);
            this.loadingText.style.fontSize = fontSize;
        }
    }
} 