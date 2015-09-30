var app = (function() {
  var canvas = document.getElementById('canvas');

  var posX = 0
    , posY = 0
    , level = []
    , interval = 50
    , animating = false
    , playerColor = '#fff'
    , mapColor = '#666'
    ;

  var calc = (function() {
    var playerPosition = function() {
      console.log('ok');
    };

    return {
      playerPosition: playerPosition
    };
  }());

  var draw = (function() {
    var context = canvas.getContext('2d');

    var canvasProps = {
      width: canvas.width
      , height: canvas.height
    };

    var clearCanvas = function() {
      context.clearRect(0, 0, canvasProps.width, canvasProps.height);
    };

    var map = function() {
      context.fillStyle = mapColor;
      for(var i = 0, len = level.length; i < len; i++) {
        context.fillRect(level[i].x, level[i].y, 50, 50);
      }
    };

    var player = function(x, y) {
      context.fillStyle = playerColor;
      context.fillRect(posX, posY, 50, 50);

      var destX = posX + x;
      var destY = posY + y;

      setTimeout(function() {
        if(destX != posX || destY != posY) {
          var step = 5;
          if(x > 0) posX += step;
          else if(x < 0) posX -= step;
          if(y > 0) posY += step;
          else if(y < 0) posY -= step;

          animating = true;
          game(destX - posX, destY - posY);
        } else {
          animating = false;
        }
      });
    };

    var game = function(x, y) {
      clearCanvas();
      context.beginPath();

      map();
      player(x, y);

      context.closePath();
    };

    return {
      game: game
    };
  }());

  var doMovement = function(key) {
    var x = 0
      , y = 0;
    if(key == 38 || key == 75)
      y -= interval;
    else if(key == 40 || key == 74)
      y += interval;
    else if(key == 72 || key == 37)
      x -= interval;
    else if(key == 76 || key == 39)
      x += interval;
    draw.game(x, y);
  };

  var keyboardHandle = function() {
    var moveKeys = [ 72, 74, 75, 76, 37, 38, 39, 40 ];
    document.onkeydown = function(e) {
      var key = e.keyCode;
      if(moveKeys.indexOf(key) > -1 && !animating)
        doMovement(key);
    };
  };


  // Load map vertices to init
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if(req.readyState == 4 && req.status == 200) {
      level = JSON.parse(req.response);
      draw.game(0, 0);
      keyboardHandle();
    }
  };
  req.open('GET', 'data/map.php', true);
  req.send(null);
}());
