var DIR_LEFT = 0;
var DIR_RIGHT = 1;

enchant();
window.onload = function() {
    var game = new Core(320, 320);
    var g = game;
    game.fps = 30;
    game.preload('assets/prisoner.png', 'assets/map.png', 'assets/basket.png', 'assets/bomb.png');
    game.onload = function() {
        var bg = new Sprite(320, 320);
        var maptip = game.assets['assets/map.png'];
        var image = new Surface(320, 320);

        for (var j = 0; j < 80; j += 16) {
            for (var i = 0; i < 320; i +=16) {
                image.draw(maptip, 0, 0, 16, 16, i, j, 16, 16);
                    // maptip: the preloaded image asset used as the source image
                    // 0, 0: coordinates of upper left corner of the source clipping
                    // 16, 16: width and height of the source clipping
                    // i, j: coorinates of upper left corner of the destination
                    // 16, 16: width and height of the destination
            }
        }

        for (var j = 80; j < 320; j+=16) {
            for (var i = 0; i < 320; i +=16) {
                image.draw(maptip, 16, 0, 16, 16, i, j, 16, 16);
            }
        }

        bg.image = image;
        game.rootScene.addChild(bg);

        var level = 1;
        var score = 0;

        var basket = new Sprite(62, 89);
        basket.image = game.assets['assets/basket.png'];
        basket.x = 160-31;
        basket.y = 260-45;
        basket.frame = 0;

        var prisoner = new Sprite(32, 66);
        prisoner.direction = 0;
        prisoner.duration = 0;
        prisoner.image = game.assets['assets/prisoner.png'];
        prisoner.x = 160-16;
        prisoner.y = 51-33;
        prisoner.frame = 0;
        prisoner.bomb = new Array();

        game.rootScene.addChild(basket);
        game.rootScene.addChild(prisoner);

        basket.move = function(x) {
          targetX = x/2 - 31;
          if (targetX >= 0 && targetX <= 320-62) {
              this.x = targetX;
          } else if (targetX > 320-62) {
              this.x = 320-62
          } else {
              this.x = 0
          }
        };

        prisoner.move = function() {
          if (this.duration <= 0) {
            this.direction = Math.floor(Math.random()*2);
            this.duration = Math.floor(Math.random()*20+5);
          }

          if (this.x <= 0) {
            this.direction = DIR_RIGHT;
          } else if (this.x >= 320 - 32) {
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
          level += 1;
          this.bomb = [];
        }

        prisoner.addEventListener(Event.ENTER_FRAME, function() {
          this.move();
          this.duration -= 1;
          if (this.age % 33 === 0 && this.bomb.length < level * 10) {
            this.dropBomb();
          } else if (this.bomb.length >= level * 10) {
            this.changeLevel();
          }
        });

        basket.addEventListener(Event.ENTER_FRAME, function() {
          console.log(prisoner.bomb[0]);
        });

        document.addEventListener("mousemove", function(event){
            basket.move(event.pageX);
        });
    };
    game.start();
};
