var canvas = document.getElementById('my-canvas');
var context = canvas.getContext('2d');

setInterval(draw, 10);

var x = canvas.width / 2;
var y = canvas.height -30;

var dx = 2;
var dy = -2;

var ballRadius = 10;

function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI*2);
    context.fillStyle='green';
    context.fill();
    context.closePath();
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    if (y + dy < ballRadius || y + dy > canvas.height-ballRadius) {
        dy = -dy;
    } 
    
    if (x + dx < ballRadius || x + dx > canvas.width-ballRadius) {
        dx = -dx;
    }

    x += dx;
    y += dy;
}
