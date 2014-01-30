enchant();
window.onload = function() {
    var game = new Core(320, 320);
    var g = game;
    game.fps = 30;
    game.preload('Assets/prisoner.png', 'Assets/map.png', 'Assets/basket.png');
    game.onload = function() {
        var bg = new Sprite(320, 320);
        var maptip = game.assets['Assets/map.png'];
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

        var basket = new Sprite(62, 89);
        basket.image = game.assets['Assets/basket.png'];
        basket.x = 160-31;
        basket.y = 260-45;
        basket.frame = 0;

        var prisoner = new Sprite(32, 66);
        prisoner.image = game.assets['Assets/prisoner.png'];
        prisoner.x = 160-16;
        prisoner.y = 51-33;
        prisoner.frame = 0;

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

        basket.addEventListener(Event.TOUCH_MOVE, function(event) {
            this.x = event.x;
        });

        document.addEventListener("mousemove", function(event){
            basket.move(event.pageX);
        });
    };
    game.start();
};