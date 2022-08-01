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

let isPainting = false;

function onMove({ offsetX, offsetY }) {
  if (isPainting) {
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(offsetX, offsetY);
}
function startPainting() {
  isPainting = true;
}
function cancelPainting() {
  isPainting = false;
}

canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);
