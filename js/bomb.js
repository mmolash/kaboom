var createBomb = function(x, y, game, level, basket) {
  var bomb = createGameObject(x, y, 23, 33, 0, game, level, basket);

  var that = Object.create(bomb);

  that.sprite.move = function(level) {
    that.sprite.y += Math.log(level+1) * 5;
  }

  that.sprite.checkCollision = function () {
    if ((basket.x - this.x) >= -62 && (basket.x - this.x) <= 23) {
      if ((basket.y - this.y) <= 31 && (basket.x - this.x) >= -89) {
        return true;
      }
    } else {
      return false;
    }
  }

  that.sprite.checkExplosion = function () {
    if (this.y + 33 >= WINDOW_HEIGHT) {
      game.rootScene.removeChild(this);
      return true;
    } else {
      return false;
    }
  }

  that.sprite.addEventListener(Event.ENTER_FRAME, function() {
    this.move(level);
    this.checkExplosion();
  });

  return that;
};
