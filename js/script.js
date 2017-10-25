var canvas = document.getElementById('my-canvas');
var context = canvas.getContext('2d');

var x = canvas.width / 2;
var y = canvas.height -30;

var dx = 2;
var dy = -2;

var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 7;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var score = 0;
var lives = 3;

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { 
          x: 0,
          y: 0,
          status: 1
        };
  }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function drawBricks () {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                var brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                context.beginPath();
                context.rect(brickX, brickY, brickWidth, brickHeight);
                context.fillStyle='green';
                context.fill();
                context.closePath();
            }
        }
      }
}

function keyDownHandler(e) {
    if (e.keyCode === 39) {
        rightPressed = true;
    } else if (e.keyCode === 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode === 39) {
        rightPressed = false;
    } else if (e.keyCode === 37) {
        leftPressed = false;
    }
}

function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI*2);
    context.fillStyle='green';
    context.fill();
    context.closePath();
}

function drawPaddle() {
    context.beginPath();
    context.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    context.fillStyle = 'green';
    context.fill();
    context.closePath();
}

function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status === 1) {
                if(x > b.x && x < b.x + brickWidth && 
                    y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;

                    if (score === brickRowCount * brickColumnCount) {
                        alert('You won!!');
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore(){
    context.font='16px sans-serif';
    context.fillStyle='green';
    context.fillText("Score: " + score, 10, 15, 100);
}

function drawLives(){
    context.font='16px sans-serif';
    context.fillStyle='green';
    context.fillText("Lives: " + lives, canvas.width - 65, 15, 100);
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    drawScore();
    drawLives();

    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height-ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            lives--;

            if (!lives) {
                alert('Game Over!');
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;

                dx = 2;
                dy = -2;

                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }
    
    if (x + dx < ballRadius || x + dx > canvas.width-ballRadius) {
        dx = -dx;
    }

    if (rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;

    requestAnimationFrame(draw);
}

document.addEventListener('mousemove', mouseMoveHandler);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;

    // Also works but with some padding somehow:
    // if (relativeX > 0 + paddleWidth/2 && relativeX < canvas.width - paddleWidth/2) {
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth /2;
    } else if (relativeX < 0) {
        paddleX = 0;
    } else if (relativeX > canvas.width) {
        paddleX = canvas.width - paddleWidth;
    }
}

draw();
