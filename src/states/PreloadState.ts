/// <reference path="../../lib/phaser.d.ts" />
module states {
    
    export class PreloadState extends Phaser.State {
        preloadBar: Phaser.Sprite;
        
        preload() {
            this.preloadBar = this.add.sprite(this.game.world.width / 2, this.game.world.height / 2, "preloadbar");
            this.preloadBar.anchor.setTo(0.5, 0.5);
            this.load.setPreloadSprite(this.preloadBar);
            
            this.load.image("titlepage", "assets/titlepage.jpg");
            this.load.image("level1", "assets/level1.png");
            this.load.image("osaa", "assets/OSAA_LOGO.png");
            this.load.audio("zap", "assets/zap.wav");

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
