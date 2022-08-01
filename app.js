const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_SIZE = innerWidth * 0.4;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.lineWidth = 2;

const colors = [
  '#c56cf0',
  '#ffb8b8',
  '#ff3838',
  '#ff9f1a',
  '#ff9f1a',
  '#fff200',
  '#32ff7e',
  '#7efff5',
  '#18dcff',
  '#7d5fff',
  '#4b4b4b',
];

const beginPoint = { x: 0, y: 0 };

function onMove({ offsetX, offsetY }) {
  ctx.beginPath();
  ctx.moveTo(beginPoint.x, beginPoint.y);
  ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)];

  ctx.lineTo(offsetX, offsetY);
  ctx.stroke();
}

function onClick({ offsetX, offsetY }) {
  beginPoint.x = offsetX;
  beginPoint.y = offsetY;
}

canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('click', onClick);
