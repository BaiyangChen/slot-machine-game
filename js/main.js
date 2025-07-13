// Game entry point
document.addEventListener('DOMContentLoaded', () => {
    // Create PixiJS application
    const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x1099bb,
        antialias: true,
        resolution: window.devicePixelRatio || 1
    });
    
    // Add canvas to DOM
    document.body.appendChild(app.view);
    
    // Create and start preloader
    const preloader = new Preloader(app);
    
    preloader.load().then(() => {
        // Create and start game
        const game = new SlotMachine(app);
    });
}); 