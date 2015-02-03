/// <reference path="../../lib/phaser.d.ts" />
/// <reference path="../Player.ts"/>
module states {
    
    export class PlayState extends Phaser.State {
        
        ball: Phaser.Sprite;
        //music: Phaser.Sound;
        player1: Player;
        player2: Player;
        player3: Player;
        player4: Player;
        
        create() {
            //this.background = this.add.sprite(this.game.world.width / 2, 0, "level1");
            //this.background.anchor.setTo(0.5, 0);
            //this.music = this.add.audio("zap", 1, false);
            //this.music.play();            
            
            //this.player = new Player(this.game, 130, 284);

            this.ball = this.add.sprite(this.game.world.width / 2, this.game.world.height / 2, "ball");
            this.ball.anchor.setTo(0.5, 0.5);
            this.game.physics.arcade.enableBody(this.ball);
            this.game.add.existing(this.ball);
            
            this.ball.body.collideWorldBounds = true;
            this.ball.body.bounce.set(1.02);

            var speed = 200;
            var ang = Math.random() * 360;

            var speedY = Math.sin(ang) * speed;
            var speedX = Math.cos(ang) * speed;

            this.ball.body.velocity.x = speedX;
            this.ball.body.velocity.y = speedY;

            this.player1 = new Player(this.game, 0, 0, "bottom");
            this.player2 = new Player(this.game, 0, 0, "top");
            this.player3 = new Player(this.game, 0, 0, "left");
            this.player4 = new Player(this.game, 0, 0, "right");

        }

        update() {
            //console.log(this.ball.body.velocity.y);
            this.physics.arcade.collide(this.player1, this.ball, this.hitBall, null, this)
        }

        hitBall(p, b) {
            //console.log(b.body.velocity.y);
            //b.body.velocity.y = -b.body.velocity.y;
            var diff = (p.x - b.x);
            //if (diff > 0) // left side
            //{
            //    diff = diff / 40;
            //    b.body.velocity.x = -diff * Math.abs(b.body.velocity.x);


            //}
            //else if (diff < 0) {
            //    diff = diff / 40;
            //    b.body.velocity.x = -diff * Math.abs(b.body.velocity.x);


            //}
            console.log("s: " + b.body.speed);

            var C = b.body.speed * 1.02;
            var A = -diff * 3;
            var B; // C*c = A*a + B*b; => B = sqrt(C*c - A*a)
            B = Math.sqrt(Math.abs(C * C - A * A));
            var ang = diff / 80 * 90 + 90;
            var speedY = Math.sin(ang) * C;
            var speedX = Math.cos(ang) * C;
            console.log(speedX, speedY, ang);
            b.body.velocity.x = 0;
            b.body.velocity.y = -100;

        }
        
    }

}
