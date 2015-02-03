var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../lib/phaser.d.ts" />
var states;
(function (states) {
    var BootState = (function (_super) {
        __extends(BootState, _super);
        function BootState() {
            _super.apply(this, arguments);
        }
        BootState.prototype.init = function () {
            //this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            //if (this.game.device.desktop) {
            //    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //    this.scale.setMinMax(480, 260, 1024, 768);
            //    //this.scale.pageAlignHorizontally = true;
            //    //this.scale.pageAlignVertically = true;
            //}
            //else {
            //    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //    this.scale.setMinMax(480, 260, 1024, 768);
            //    //this.scale.pageAlignHorizontally = true;
            //    //this.scale.pageAlignVertically = true;
            //    this.scale.forceOrientation(true, false);
            //    this.scale.setResizeCallback(this.gameResized, this);
            //    this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            //    this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            //}
        };

        BootState.prototype.preload = function () {
            this.load.image("preloadbar", "assets/loader.png");
        };

        BootState.prototype.create = function () {
            this.game.state.start("preload", true, false);
        };

        BootState.prototype.gameResized = function (width, height) {
            //  This could be handy if you need to do any extra processing if the game resizes.
            //  A resize could happen if for example swapping orientation on a device or resizing the browser window.
            //  Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.
        };

        BootState.prototype.enterIncorrectOrientation = function () {
            document.getElementById('orientation').style.display = 'block';
        };

        BootState.prototype.leaveIncorrectOrientation = function () {
            document.getElementById('orientation').style.display = 'none';
        };
        return BootState;
    })(Phaser.State);
    states.BootState = BootState;
})(states || (states = {}));
/// <reference path="../../lib/phaser.d.ts" />
var states;
(function (states) {
    var PreloadState = (function (_super) {
        __extends(PreloadState, _super);
        function PreloadState() {
            _super.apply(this, arguments);
        }
        PreloadState.prototype.preload = function () {
            this.preloadBar = this.add.sprite(this.game.world.width / 2, this.game.world.height / 2, "preloadbar");
            this.preloadBar.anchor.setTo(0.5, 0.5);
            this.load.setPreloadSprite(this.preloadBar);

            this.load.image("ball", "assets/ball.png");
            this.load.image("bar", "assets/bar.png");
            this.load.image("bar-h", "assets/bar-h.png");
            this.load.image("titlepage", "assets/titlepage.jpg");

            this.load.audio("zap", "assets/zap.wav");
        };

        PreloadState.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startTitleMenu, this);
        };

        PreloadState.prototype.startTitleMenu = function () {
            this.game.state.start("title", true, false);
        };
        return PreloadState;
    })(Phaser.State);
    states.PreloadState = PreloadState;
})(states || (states = {}));
/// <reference path="../../lib/phaser.d.ts" />
var states;
(function (states) {
    var TitleState = (function (_super) {
        __extends(TitleState, _super);
        function TitleState() {
            _super.apply(this, arguments);
        }
        TitleState.prototype.create = function () {
            this.background = this.add.sprite(this.game.world.width / 2, 0, "titlepage");
            this.background.anchor.setTo(0.5, 0);
            this.background.alpha = 0;

            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Elastic.InOut, true);

            this.input.onDown.addOnce(this.fadeOut, this);
        };

        TitleState.prototype.fadeOut = function () {
            this.game.state.start("play", true, false);
        };
        return TitleState;
    })(Phaser.State);
    states.TitleState = TitleState;
})(states || (states = {}));
/// <reference path="../lib/phaser.d.ts" />
var states;
(function (states) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y, type) {
            if (type == "bottom" || type == "top") {
                _super.call(this, game, x, y, "bar-h", 0);
            } else {
                _super.call(this, game, x, y, "bar", 0);
            }
            this.name = type;
            this.anchor.setTo(0.5, 0.5);
            game.physics.arcade.enableBody(this);

            if (type == "bottom") {
                this.position.x = this.game.world.width / 2;
                this.position.y = this.game.world.height - this.height;
            }
            if (type == "top") {
                this.position.x = this.game.world.width / 2;
                this.position.y = this.height;
            }
            if (type == "left") {
                this.position.y = this.game.world.height / 2;
                this.position.x = this.width;
            }
            if (type == "right") {
                this.position.y = this.game.world.height / 2;
                this.position.x = this.game.world.width - this.width;
            }
            this.body.collideWorldBounds = true;

            //this.body.bounce.set(1);
            this.body.immovable = true;
            game.add.existing(this);
        }
        Player.prototype.update = function () {
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
        };
        return Player;
    })(Phaser.Sprite);
    states.Player = Player;
})(states || (states = {}));
/// <reference path="../../lib/phaser.d.ts" />
/// <reference path="../Player.ts"/>
var states;
(function (states) {
    var PlayState = (function (_super) {
        __extends(PlayState, _super);
        function PlayState() {
            _super.apply(this, arguments);
        }
        PlayState.prototype.create = function () {
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

            this.player1 = new states.Player(this.game, 0, 0, "bottom");
            this.player2 = new states.Player(this.game, 0, 0, "top");
            this.player3 = new states.Player(this.game, 0, 0, "left");
            this.player4 = new states.Player(this.game, 0, 0, "right");
        };

        PlayState.prototype.update = function () {
            //console.log(this.ball.body.velocity.y);
            this.physics.arcade.collide(this.player1, this.ball, this.hitBall, null, this);
        };

        PlayState.prototype.hitBall = function (p, b) {
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
            var B;
            B = Math.sqrt(Math.abs(C * C - A * A));
            var ang = diff / 80 * 90 + 90;
            var speedY = Math.sin(ang) * C;
            var speedX = Math.cos(ang) * C;
            console.log(speedX, speedY, ang);
            b.body.velocity.x = 0;
            b.body.velocity.y = -100;
        };
        return PlayState;
    })(Phaser.State);
    states.PlayState = PlayState;
})(states || (states = {}));
/// <reference path="../lib/phaser.d.ts" />
/// <reference path="states/BootState.ts" />
/// <reference path="states/PreloadState.ts" />
/// <reference path="states/TitleState.ts" />
/// <reference path="states/PlayState.ts" />
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.call(this, 600, 600, Phaser.AUTO, "GAME", null);
        this.state.add("boot", new states.BootState());
        this.state.add("preload", new states.PreloadState());
        this.state.add("title", new states.TitleState());
        this.state.add("play", new states.PlayState());

        this.state.start("boot");
    }
    return Game;
})(Phaser.Game);

window.onload = function () {
    var game = new Game();
};
