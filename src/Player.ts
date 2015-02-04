/// <reference path="../lib/phaser.d.ts" />
module states {
    export class Player extends Phaser.Sprite {
        
        constructor(game: Phaser.Game, x: number, y: number, type: string) {
            if (type == "bottom" || type == "top") {
                super(game, x, y, "bar-h", 0);
            }
            else {
                super(game, x, y, "bar", 0);
            }
            this.name = type;
            this.anchor.setTo(0.5, 0.5);
            
            game.physics.arcade.enableBody(this);

            if (type == "bottom") {
                this.position.x = this.game.world.width / 2;
                this.position.y = this.game.world.height - this.height;
                this.tint = 0xFFCC99;
            }
            if (type == "top") {
                this.position.x = this.game.world.width / 2;
                this.position.y = this.height;
                this.tint = 0xFF9999;
            }
            if (type == "left") {
                this.position.y = this.game.world.height / 2;
                this.position.x = this.width;
                this.tint = 0x99FF99;
            }
            if (type == "right") {
                this.position.y = this.game.world.height / 2;
                this.position.x = this.game.world.width - this.width;
                this.tint = 0xCCFF00;
            }
            this.body.collideWorldBounds = true;
            //this.body.bounce.set(1);
            this.body.immovable = true;
            game.add.existing(this);

            this.score = 0;

        }

        
        update() {
            if (this.name == "bottom") {
                this.body.velocity.x = 0;

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                    //this.body.velocity.x -= 15;
                    this.body.velocity.x = -200;
                } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                    //this.body.velocity.x += 15;
                    this.body.velocity.x = 200;
                }
            }
            if (this.name == "top") {
                this.body.velocity.x = 0;

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                    //this.body.velocity.x -= 15;
                    this.body.velocity.x = -200;
                } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                    //this.body.velocity.x += 15;
                    this.body.velocity.x = 200;
                }
            }
            if (this.name == "left") {
                this.body.velocity.y = 0;

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
                    //this.body.velocity.x -= 15;
                    this.body.velocity.y = -200;
                } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
                    //this.body.velocity.x += 15;
                    this.body.velocity.y = 200;
                }
            }
            if (this.name == "right") {
                this.body.velocity.y = 0;

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                    //this.body.velocity.x -= 15;
                    this.body.velocity.y = -200;
                } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                    //this.body.velocity.x += 15;
                    this.body.velocity.y = 200;
                }
            }
            
        }
    }
}