/// <reference path="../lib/phaser.d.ts" />
/// <reference path="states/BootState.ts" />
/// <reference path="states/PreloadState.ts" />
/// <reference path="states/TitleState.ts" />
/// <reference path="states/PlayState.ts" />

class Game extends Phaser.Game {
    
    constructor() {
        super(1024, 768, Phaser.AUTO, "GAME", null);
        this.state.add("boot", new states.BootState());
        this.state.add("preload", new states.PreloadState());
        this.state.add("title", new states.TitleState());
        this.state.add("play", new states.PlayState());
        
        this.state.start("boot");
    }
    
}

window.onload = () => {

    var game = new Game();

};
