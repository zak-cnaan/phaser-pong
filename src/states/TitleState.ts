/// <reference path="../../lib/phaser.d.ts" />
module states {
    
    export class TitleState extends Phaser.State {
        
        background: Phaser.Sprite;
        
        create() {
            this.background = this.add.sprite(this.game.world.width / 2, 0, "titlepage");
            this.background.anchor.setTo(0.5, 0);
            this.background.alpha = 0;
            
            this.add.tween(this.background).to({ alpha: 1}, 2000, Phaser.Easing.Elastic.InOut, true);
            
            this.input.onDown.addOnce(this.fadeOut, this);
        }
        
        fadeOut() {
            this.game.state.start("play", true, false);
        }
        
    }

}
