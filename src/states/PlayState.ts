/// <reference path="../../lib/phaser.d.ts" />
/// <reference path="../Player.ts"/>
module states {
    
    export class PlayState extends Phaser.State {
        
        ball: Phaser.Sprite;
        lastHitBall: Phaser.Sprite;
        //music: Phaser.Sound;
        player1: Player;
        player2: Player;
        player3: Player;
        player4: Player;

        walls: Phaser.Group;
        players: Phaser.Group;

        zap: Phaser.Sound;
        ping: Phaser.Sound;

        render() {
            this.game.debug.text('bottomPlayer Score: ' + this.player1.score + "   is alive? " + this.player1.alive, 100, 100);
            this.game.debug.text('topPlayer Score: ' + this.player2.score + "   is alive? " + this.player2.alive, 100, 120);
            this.game.debug.text('leftPlayer Score: ' + this.player3.score + "   is alive? " + this.player3.alive, 100, 140);
            this.game.debug.text('rightPlayer Score: ' + this.player4.score + "   is alive? " + this.player4.alive, 100, 160);
            this.game.debug.text("last hit ball: "+ this.lastHitBall.name + " player", 100, 180);
        }
        
        create() {
            this.lastHitBall = new Phaser.Sprite(this.game, 0, 0);
            this.ball = this.add.sprite(this.game.world.width / 2, this.game.world.height / 2, "ball");
            this.ball.anchor.setTo(0.5, 0.5);
            this.game.physics.arcade.enableBody(this.ball);
            this.game.add.existing(this.ball);
            
            this.ball.body.collideWorldBounds = true;
            this.ball.body.bounce.set(1.02);

            var speed = 200;
            var ang = Math.random() * 360;

            var speedY = Math.sin(ang / 180 * Math.PI) * speed;
            var speedX = Math.cos(ang / 180 * Math.PI) * speed;

            this.ball.body.velocity.x = speedX;
            this.ball.body.velocity.y = speedY;

            this.players = this.add.group();

            this.player1 = new Player(this.game, 0, 0, "bottom");
            this.player2 = new Player(this.game, 0, 0, "top");
            this.player3 = new Player(this.game, 0, 0, "left");
            this.player4 = new Player(this.game, 0, 0, "right");

            this.players.add(this.player1);
            this.players.add(this.player2);
            this.players.add(this.player3);
            this.players.add(this.player4);


            this.walls = this.add.group();
            this.walls.enableBody = true;

            var leftWall = this.walls.create(0, 0, 'white');
            var rightWall = this.walls.create(this.game.world.width-3, 0, 'white');
            var topWall = this.walls.create(0, 0, 'white');
            var bottomWall = this.walls.create(0, this.game.world.height - 3, 'white');

            this.walls.setAll('tint', 0x000000);

            leftWall.height = this.game.world.height;
            leftWall.width = 3;
            leftWall.name = 'leftWall';
            leftWall.body.immovable = true;
            leftWall.isTweenin = false;

            rightWall.height = this.game.world.height;
            rightWall.width = 3;
            rightWall.name = 'rightWall';
            rightWall.body.immovable = true;
            rightWall.isTweenin = false;

            topWall.height = 3;
            topWall.width = this.game.world.width;
            topWall.name = 'topWall';
            topWall.body.immovable = true;
            topWall.isTweenin = false;

            bottomWall.height = 3;
            bottomWall.width = this.game.world.width;
            bottomWall.name = 'bottomWall';
            bottomWall.body.immovable = true;
            bottomWall.isTweenin = false;

            this.zap = this.game.add.audio('zap');
            this.ping = this.game.add.audio('ping');

        }

        update() {
            //console.log(this.ball.body.velocity.y);
            this.physics.arcade.collide(this.player1, this.ball, this.hitBall, null, this);
            this.physics.arcade.collide(this.player2, this.ball, this.hitBall, null, this);
            this.physics.arcade.collide(this.player3, this.ball, this.hitBall, null, this);
            this.physics.arcade.collide(this.player4, this.ball, this.hitBall, null, this);

            this.physics.arcade.overlap(this.ball, this.walls, this.hitWall, null, this);




        }

        hitWall(b, w) {
            var playerKilled = false;
            if (w.name == 'leftWall' && this.player3.exists) {
                this.player3.kill();
                playerKilled = true;
                this.lastHitBall.score += 1;

            }
            if (w.name == 'rightWall' && this.player4.exists) {
                this.player4.kill();
                playerKilled = true;
                this.lastHitBall.score += 1;

            }
            if (w.name == 'bottomWall' && this.player1.exists) {
                this.player1.kill();
                playerKilled = true;
                this.lastHitBall.score += 1;

            }
            if (w.name == 'topWall' && this.player2.exists) {
                this.player2.kill();
                playerKilled = true;
                this.lastHitBall.score += 1;

            }
            

            if (!w.isTweenin) {
                if (playerKilled)
                    this.zap.play();
                else
                    this.ping.play();

                w.isTweenin = true;
                var tween = this.game.add.tween(w);
                tween.to({ tint: 0xFF0000 }, 100, "Linear", false, 0, 0, true);
                tween.onComplete.add(this.wallTweenComplete, this)
                tween.start();
            }

            if (this.players.countLiving() <= 1) {
                this.gameOver();
            };
        }

        gameOver() {
            var game = this.game;
            this.ball.kill();
            var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
            var txt = game.add.text(game.world.centerX, game.world.centerY, "GAME OVER", style);
            txt.anchor.set(0.5, 0.5);

            var style2 = { font: "24px Arial", fill: "#ffffff", align: "center" };
            var txt2 = game.add.text(game.world.centerX, game.world.centerY+50, "Click to Restart", style2);
            txt2.anchor.set(0.5, 0.5);
            this.input.onDown.addOnce(function () {
                game.state.start(game.state.current);
            }, this);
        }

        wallTweenComplete(w) {
            w.isTweenin = false;
        }


        hitBall(p, b) {
            this.ping.play();
            this.lastHitBall = p;
            if (p == this.player1) {
                var diff = (p.x - b.x);

                var C = b.body.speed * 1.02;
                var ang = 270 - diff / 100 * 80;
                var speedY = Math.sin(ang / 180 * Math.PI) * C;
                var speedX = Math.cos(ang / 180 * Math.PI) * C;

            }
            if (p == this.player2) {
                var diff = -(p.x - b.x);

                var C = b.body.speed * 1.02;
                var ang = 90 - diff / 100 * 80;
                var speedY = Math.sin(ang / 180 * Math.PI) * C;
                var speedX = Math.cos(ang / 180 * Math.PI) * C;

               
               
            }

            if (p == this.player3) {
                var diff = -(p.y - b.y);

                var C = b.body.speed * 1.02;
                var ang = diff / 100 * 80;
                var speedY = Math.sin(ang / 180 * Math.PI) * C;
                var speedX = Math.cos(ang / 180 * Math.PI) * C;

            }

            if (p == this.player4) {
                var diff = -(p.y - b.y);

                var C = b.body.speed * 1.02;
                var ang = 180 - diff / 100 * 80;

                var speedY = Math.sin(ang / 180 * Math.PI) * C;
                var speedX = Math.cos(ang / 180 * Math.PI) * C;

            }

            b.body.velocity.x = speedX;
            b.body.velocity.y = speedY;
        }
        
    }

}
