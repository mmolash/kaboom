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

        for (var j = 0; j < 320; j += 16) {
            for (var i = 0; i < 320; i +=16) {
                image.draw(maptip, 0, 0, 16, 16, i, j, 16, 16);
                    // maptip: the preloaded image asset used as the source image
                    // 0, 0: coordinates of upper left corner of the source clipping
                    // 16, 16: width and height of the source clipping
                    // i, j: coorinates of upper left corner of the destination
                    // 16, 16: width and height of the destination
            }
        }

        bg.image = image;
        game.rootScene.addChild(bg);

        var thing = new Sprite(62, 89);
        thing.image = game.assets['Assets/basket.png'];
        thing.x = 160-31;
        thing.y = 260-45;
        thing.frame = 0;

        thing.move = function(direction) {
            switch(direction) {
              case "right":
                if (this.x < 320-62) {
                    thing.x += 5;
                }
                break;
              case "left":
                if (this.x > 0) {
                    thing.x -= 5;
                }
                break;
              default:
                console.log("not a valid direction");
                break;
            }
        }

        game.rootScene.addChild(thing);
        thing.addEventListener(Event.ENTER_FRAME, function() {
            if (g.input.right) {
                this.move("right");
            }
            if (g.input.left) {
                this.move("left");
            }
        });

        thing.addEventListener(Event.TOUCH_MOVE, function(event) {
            this.x = event.x;
        });
    };
    game.start();
};