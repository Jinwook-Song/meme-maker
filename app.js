const clearBtn = document.getElementById('clear-canvas');
const toggleMode = document.getElementById('toggle-mode');
const colorOptions = [...document.getElementsByClassName('color-option')];
const selectedColor = document.getElementById('color');
const lineWidth = document.getElementById('line-width');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Canvas Set
const CANVAS_SIZE = innerWidth * 0.4;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.lineWidth = lineWidth.value;

// Paint Mode
let isPainting = false;
let isFilling = false;

// Drawing Functions
function onMove({ offsetX, offsetY }) {
  if (isPainting) {
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(offsetX, offsetY);
}
function onMobileMove({ changedTouches }) {
  if (isPainting) {
    ctx.lineTo(changedTouches[0].sreenX, changedTouches[0].sreenY);
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

// Set Options
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
function handleToggleMode() {
  if (isFilling) {
    isFilling = false;
    toggleMode.innerText = 'FILL';
  } else {
    isFilling = true;
    toggleMode.innerText = 'DRAW';
  }
}

// Fill & Clear
function handleFillCanvas() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}
function handleClearCanvas() {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

// Event Listeners
canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('touchmove', onMobileMove, false);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('touchstart', startPainting, false);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('touchend', cancelPainting, false);
canvas.addEventListener('mouseleave', cancelPainting);
canvas.addEventListener('touchcancel', cancelPainting, false);
canvas.addEventListener('click', handleFillCanvas);

selectedColor.addEventListener('change', handleColorChange);
colorOptions.forEach((color) =>
  color.addEventListener('click', handleColorPick)
);
lineWidth.addEventListener('change', handleLineWidth);

toggleMode.addEventListener('click', handleToggleMode);
clearBtn.addEventListener('click', handleClearCanvas);
