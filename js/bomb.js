var createBomb = function(x, y, game) {
  var bomb = createGameObject(x, y, 23, 33, 0, game);

  var that = Object.create(bomb);

  that.sprite.move = function(y) {
    that.sprite.y += 2;
  }

  that.sprite.addEventListener(Event.ENTER_FRAME, function() {
    this.move();
  });
};