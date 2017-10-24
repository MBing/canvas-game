var canvas = document.getElementById('my-canvas');
var context = canvas.getContext('2d');

context.beginPath();
context.rect(20, 40, 50, 50);
context.fillStyle='#FF0000';
context.fill();
context.c

context.beginPath();
context.arc(240, 160, 20, 0, Math.PI*2, false);
context.fillStyle='green';
context.fill();
context.closePath();
