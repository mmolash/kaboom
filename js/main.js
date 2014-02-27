var DIR_LEFT = 0;
var DIR_RIGHT = 1;
var WINDOW_WIDTH = 640;
var WINDOW_HEIGHT = 400;
var gameStatus = -1;

enchant();
window.onload = function() {
    var game = new Core(WINDOW_WIDTH, WINDOW_HEIGHT);
    var g = game;
    game.fps = 30;
    game.preload('assets/prisoner.png', 'assets/map.png', 'assets/basket.png', 'assets/bomb.png');
    game.onload = function() {
        var bg = new Sprite(WINDOW_WIDTH, WINDOW_HEIGHT);
        var maptip = game.assets['assets/map.png'];
        var image = new Surface(WINDOW_WIDTH, WINDOW_HEIGHT);

        for (var j = 0; j < 80; j += 16) {
            for (var i = 0; i < WINDOW_WIDTH; i +=16) {
                image.draw(maptip, 0, 0, 16, 16, i, j, 16, 16);
                    // maptip: the preloaded image asset used as the source image
                    // 0, 0: coordinates of upper left corner of the source clipping
                    // 16, 16: width and height of the source clipping
                    // i, j: coorinates of upper left corner of the destination
                    // 16, 16: width and height of the destination
            }
        }

        for (var j = 80; j < WINDOW_HEIGHT; j+=16) {
            for (var i = 0; i < WINDOW_WIDTH; i +=16) {
                image.draw(maptip, 16, 0, 16, 16, i, j, 16, 16);
            }
        }

        bg.image = image;
        game.rootScene.addChild(bg);

        var level = 0;
        var score = 0;

        var scoreboard = new Label("0");
        scoreboard.font  = "30px Press-Start-2P";
        scoreboard.color = "yellow";
        scoreboard.x     = 5;
        scoreboard.y     = 5;

        var basket = new Sprite(62, 89);
        basket.image = game.assets['assets/basket.png'];
        basket.x = WINDOW_WIDTH/2-31;
        basket.y = WINDOW_HEIGHT-89-20;
        basket.frame = 0;

        var prisoner = new Sprite(32, 66);
        prisoner.direction = 0;
        prisoner.duration = 0;
        prisoner.image = game.assets['assets/prisoner.png'];
        prisoner.x = 160-16;
        prisoner.y = 51-33;
        prisoner.frame = 0;
        prisoner.bomb = new Array();
        prisoner.num_bombs = 0;

        var levelLabel = new Label("New Level");
        levelLabel.font = "40px Press-Start-2P";
        levelLabel.color = "yellow";
        levelLabel.x = 140;
        levelLabel.y = 200-20;

        game.rootScene.addChild(basket);
        game.rootScene.addChild(prisoner);
        game.rootScene.addChild(scoreboard);

        levelLabel.addEventListener(Event.TOUCH_START, function() {
          if (gameStatus === 1) {
            game.rootScene.removeChild(levelLabel);
            gameStatus = 2;
          }
        });

        basket.move = function(x) {
          targetX = x - 31;
          if (targetX >= 0 && targetX <= WINDOW_WIDTH-62) {
              this.x = targetX;
          } else if (targetX > WINDOW_WIDTH-62) {
              this.x = WINDOW_WIDTH-62
          } else {
              this.x = 0
          }
        };

        prisoner.move = function() {
          if (this.duration <= 0) {
            this.direction = Math.floor(Math.random()*2);
            this.duration = Math.floor(Math.random()*15+5);
          }

          if (this.x <= 0) {
            this.direction = DIR_RIGHT;
          } else if (this.x >= WINDOW_WIDTH - 32) {
            this.direction = DIR_LEFT;
          }

          if (this.direction === DIR_LEFT) {
            this.x -= Math.log(level+1) * 7;
          } else if (this.direction === DIR_RIGHT) {
            this.x += Math.log(level+1) * 7;
          }
        }

        prisoner.dropBomb = function() {
          this.bomb.push(createBomb(this.x, (this.y + 66 - 16), g, level, basket))
        }

        prisoner.changeLevel = function() {
          this.num_bombs = 0;
          gameStatus = 1;
          level += 1;
          game.rootScene.addChild(levelLabel);
        }

        prisoner.addEventListener(Event.ENTER_FRAME, function() {
          if (gameStatus === 2) {
            this.move();
          }

          this.duration -= 1;

          if ((this.age % Math.floor((16/Math.log(level + 1))) === 0 && this.num_bombs < level * 10) && gameStatus === 2) {
            this.dropBomb();
            this.num_bombs += 1;
          }

          if (this.num_bombs >= level * 10 && this.bomb.length === 0) {
            gameStatus = -1;
          }

          if (gameStatus === -1) {
            this.changeLevel();
          }
        });

        basket.addEventListener(Event.ENTER_FRAME, function() {
          for (var i = 0; i < prisoner.bomb.length; i++) {
            if (prisoner.bomb[i] && prisoner.bomb[i].sprite.checkExplosion()) {
              gameStatus = 0;
              if (level > 1 && gameStatus === 0) {
                level -= 1;
                gameStatus = 1;
                prisoner.bomb.splice(i, 1);
              }
            }

            if (prisoner.bomb[i] && prisoner.bomb[i].sprite.checkCollision()) {
              g.rootScene.removeChild(prisoner.bomb[i].sprite);
              score += level;
              prisoner.bomb.splice(i, 1);
            }
          }
        });

        scoreboard.addEventListener(Event.ENTER_FRAME, function() {
          this.text = score.toString();
        });

        document.addEventListener("mousemove", function(event){
            basket.move(event.pageX);
        });
    };
    game.start();
};
