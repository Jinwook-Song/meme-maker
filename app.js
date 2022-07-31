const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_SIZE = innerWidth * 0.4;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.rect(50, 50, 100, 100);
ctx.rect(150, 150, 100, 100);
ctx.rect(250, 250, 100, 100);
ctx.fill();

ctx.beginPath();
ctx.rect(350, 350, 100, 100);
ctx.rect(450, 450, 100, 100);
ctx.fillStyle = 'red';
ctx.fill();
