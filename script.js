var app = (function() {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  
  var posX = 0
    , posY = 0
    , interval = 50
    , animating = false;

  var canvasProps = {
    width: canvas.width
    , height: canvas.height
  };

  var clearCanvas = function() {
    context.clearRect(0, 0, canvasProps.width, canvasProps.height);
  };

  var drawRect = function(x, y) {
    clearCanvas();
    context.beginPath();
    context.rect(posX, posY, 50, 50);
    context.closePath();
    context.fill();

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
    drawRect(x, y);
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
    drawRect(0, 0);
    keyboardHandle();
  }());
  
}());
