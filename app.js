const colorOptions = [...document.getElementsByClassName('color-option')];
const selectedColor = document.getElementById('color');
const lineWidth = document.getElementById('line-width');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_SIZE = innerWidth * 0.4;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.lineWidth = lineWidth.value;

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
  ctx.beginPath();
}

function setColor(color) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
function handleColorChange({ target: { value } }) {
  setColor(value);
}
function handleColorPick({
  target: {
    dataset: { color },
  },
}) {
  selectedColor.value = color;
  setColor(color);
}
function handleLineWidth({ target: { value } }) {
  ctx.lineWidth = value;
}

canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);

selectedColor.addEventListener('change', handleColorChange);
colorOptions.forEach((color) =>
  color.addEventListener('click', handleColorPick)
);

lineWidth.addEventListener('change', handleLineWidth);
