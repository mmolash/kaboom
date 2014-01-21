var DIR_LEFT  = 0;
var DIR_RIGHT = 1;
var DIR_UP    = 2;
var DIR_DOWN  = 3;

enchant();
window.onload = function() {
    var game = new Core(320, 320);
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
        thing.frame = 1;

        thing.toX = thing.x;
        thing.toY = thing.y;
        thing.dir = DIR_DOWN;
        thing.anim = [
            9, 10, 11, 10, //Left
            18, 19, 20, 19, //Right
            27, 28, 29, 28, //Up
            0,  1,  2,  1]; //Down
        game.rootScene.addChild(thing);
        thing.addEventListener(Event.ENTER_FRAME, function() {
            if (thing.y > thing.toY) {
                thing.dir = DIR_UP;
                if (Math.abs(thing.y - thing.toY) < 6) {
                    thing.y = thing.toY;
                } else {
                    thing.y -= 6;
                }
            } else if (thing.y < thing.toY) {
                thing.dir = DIR_DOWN;
                if (Math.abs(thing.y - thing.toY) < 6) {
                    thing.y = thing.toY;
                } else {
                    thing.y += 6;
                }
            }
            if (thing.x > thing.toX) {
                thing.dir = DIR_LEFT;
                if (Math.abs(thing.x - thing.toX) < 6) {
                    thing.x = thing.toX;
                } else {
                    thing.x -= 6;
                }
            } else if (thing.x < thing.toX) {
                thing.dir = DIR_RIGHT;
                if (Math.abs(thing.x - thing.toX) < 6) {
                    thing.x = thing.toX;
                } else {
                    thing.x += 6;
                }
            }

            if (thing.x == thing.toX && thing.y == thing.toY)
                thing.age = 1;
            thing.frame = thing.anim[thing.dir *4 + (thing.age % 4)];
        });

        bg.addEventListener(Event.TOUCH_START, function(e) {
            thing.toX = e.x - 16;
            thing.toY = e.y - 16;
        });

        bg.addEventListener(Event.TOUCH_MOVE, function(e) {
            thing.toX = e.x - 16;
            thing.toY = e.y - 16;
        });
    };
    game.start();
};