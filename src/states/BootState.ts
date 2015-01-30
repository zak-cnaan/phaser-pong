/// <reference path="../../lib/phaser.d.ts" />
module states {
    
    export class BootState extends Phaser.State {

        init() {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);


            if (this.game.device.desktop) {
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.setMinMax(480, 260, 1024, 768);
                //this.scale.pageAlignHorizontally = true;
                //this.scale.pageAlignVertically = true;
            }
            else {
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.setMinMax(480, 260, 1024, 768);
                //this.scale.pageAlignHorizontally = true;
                //this.scale.pageAlignVertically = true;
                this.scale.forceOrientation(true, false);
                this.scale.setResizeCallback(this.gameResized, this);
                this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
                this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            }
        }
        
        preload() {
            this.load.image("preloadbar", "assets/loader.png");
        }
        
        create() {
            
            this.game.state.start("preload", true, false);
        }

        gameResized (width, height) {

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device or resizing the browser window.
        //  Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.

    }

    enterIncorrectOrientation () {

            document.getElementById('orientation').style.display = 'block';

    }

    leaveIncorrectOrientation () {

            document.getElementById('orientation').style.display = 'none';

        }
        
    }

}
