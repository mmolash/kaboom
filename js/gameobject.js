function createGameObject(x, y, width, height, frameNum, g) {
    var game = g;
    var sprite = new Sprite(width, height);

    sprite.image = game.assets['assets/bomb.png'];
    sprite.x = x;
    sprite.y = y;
    sprite.frame = frameNum;
    game.rootScene.addChild(sprite);

    var that = {
        sprite : sprite
    };

    return that;
}