const caption = document.getElementById('text');
const file = document.getElementById('file');
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
ctx.lineCap = 'round';

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

// File
function handleFileChange({ target }) {
  const file = target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
    file.value = null;
  };
}

function handleDblClick({ offsetX, offsetY }) {
  const text = caption.value;
  if (!text) return;
  ctx.save();
  ctx.lineWidth = 1;
  ctx.font = '2rem sans-serif';
  ctx.strokeText(text, offsetX, offsetY);
  ctx.restore();
}

// Event Listeners
canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);
canvas.addEventListener('click', handleFillCanvas);
canvas.addEventListener('dblclick', handleDblClick);

selectedColor.addEventListener('change', handleColorChange);
colorOptions.forEach((color) =>
  color.addEventListener('click', handleColorPick)
);
lineWidth.addEventListener('change', handleLineWidth);

toggleMode.addEventListener('click', handleToggleMode);
clearBtn.addEventListener('click', handleClearCanvas);
file.addEventListener('change', handleFileChange);
