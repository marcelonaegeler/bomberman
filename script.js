var app = (function() {
  var canvas = document.getElementById('canvas');
  
  var posX = 0
    , posY = 0
    , interval = 50
    , animating = false
    , playerColor = '#fff'
    , mapColor = '#666'
    ;
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
      context.fillRect(50, 50, 50, 50);
      context.fillRect(150, 50, 50, 50);

    };

    var player = function(x, y) {
      context.fillStyle = playerColor;
      context.fillRect(posX, posY, 50, 50);

      var destX = posX + x;
      var destY = posY + y;

      setTimeout(function() {
        if(destX != posX || destY != posY) {
          if(x > 0) posX += 5;
          else if(x < 0) posX -= 5;
          if(y > 0) posY += 5;
          else if(y < 0) posY -= 5;

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



/*
  var drawMap = function(cb) {
    context.fillStyle = '#666';
    context.rect(50, 50, 50, 50);
    cb();
  };

  var drawRect = function(x, y) {
    clearCanvas();
    context.beginPath();
    context.rect(posX, posY, 50, 50);

    drawMap(function() {
      context.closePath();
      context.fill();
    });

    var destX = posX + x;
    var destY = posY + y;

    setTimeout(function() {
      if(destX != posX || destY != posY) {
        if(x > 0) posX += 5;
        else if(x < 0) posX -= 5;
        if(y > 0) posY += 5;
        else if(y < 0) posY -= 5;

        animating = true;
        drawRect(destX - posX, destY - posY);
      } else {
        animating = false;
      }
    }, 8);
  };
*/
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
    //drawRect(x, y);
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


  // Init function
  (function() {
    draw.game(0, 0);
    //drawRect(0, 0);
    keyboardHandle();
  }());
  
}());
