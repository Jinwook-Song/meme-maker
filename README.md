# Canvas

| 프로젝트 기간 | 22.07.31 ~   |
| ------------- | ------------ |
| 프로젝트 목적 | Using Canvas |
| Github        | ‣            |

---

canvas api는 javascript로 그래픽을 그릴수 있게 해주는 api

[https://developer.mozilla.org/ko/docs/Web/API/Canvas_API](https://developer.mozilla.org/ko/docs/Web/API/Canvas_API)

```tsx
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
```

strokeRect = rect + stroke

fillRect = rect + fill

새로운 path를 시작할때 beginPath() 사용

---

rect = moveTo와 lineTo의 결합

lineTo는 moveTo + 선을 긋는 기능

```tsx
ctx.moveTo(50, 50);
ctx.lineTo(150, 50);
ctx.lineTo(150, 150);
ctx.lineTo(50, 150);
ctx.lineTo(50, 50);
ctx.fill();
```

---

painting lines

```tsx
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
```

---

mouse painting

```tsx
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
```
