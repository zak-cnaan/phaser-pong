/// <reference path="../../lib/phaser.d.ts" />
module states {
    
    export class PreloadState extends Phaser.State {
        preloadBar: Phaser.Sprite;
        
        preload() {
            this.preloadBar = this.add.sprite(this.game.world.width / 2, this.game.world.height / 2, "preloadbar");
            this.preloadBar.anchor.setTo(0.5, 0.5);
            this.load.setPreloadSprite(this.preloadBar);
            
            this.load.image("ball", "assets/ball.png");
            this.load.image("bar", "assets/bar.png");
            this.load.image("bar-h", "assets/bar-h.png");
            this.load.image("titlepage", "assets/titlepage.jpg");

            this.load.image("black", "assets/black.png");
            this.load.image("white", "assets/white.png");

            this.load.audio("zap", "assets/zap.wav");
            this.load.audio("ping", "assets/ping.wav");

        }
        
        create() {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startTitleMenu, this);            
        }
        
        startTitleMenu() {
            this.game.state.start("title", true, false);   
        }
        
    }

}
