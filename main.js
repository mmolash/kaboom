var DIR_LEFT  = 0;
var DIR_RIGHT = 1;
var DIR_UP    = 2;
var DIR_DOWN  = 3;

enchant();
window.onload = function() {
    var game = new Core(320, 320);
    var g = game;
    game.fps = 16;
    game.preload('Assets/prisoner.png', 'Assets/map.png');
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

        var thing = new Sprite(25, 50);
        thing.image = game.assets['Assets/prisoner.png'];
        thing.x = 160-13;
        thing.y = 75-25;
        thing.frame = 0;

        thing.move = function(direction) {
            switch(direction) {
              case "right":
                thing.x += 5;
                thing.scaleX = 1;
                break;
              case "left":
                thing.x -= 5;
                thing.scaleX = -1;
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
    };
    game.start();
};