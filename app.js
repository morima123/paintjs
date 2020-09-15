const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
//const mode = document.getElementsByClassName("jsMode");
const penBtn = document.getElementById("penBtn");
const fillBtn = document.getElementById("fillBtn");
const modeBtn = document.getElementsByClassName("modeBtn");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 800;
canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

//FOR BEGIN AND END PAINTING
function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

//FOR PAINTING
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

//FOR CHOOSING COLOURS
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

//FOR THE RANGE INPUT
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

//PAINT OR FILL MODES
function inputMode() {
  if (pen.disabled) {
    pen.style.backgroundColor("#111");
  }
}

//Modify here
function handleModeClick() {
  if (filling) {
    filling = false;
    penBtn.disabled = true;
    fillBtn.disabled = false;
    console.log("painting");
  } else {
    filling = true;
    penBtn.disabled = false;
    fillBtn.disabled = true;
    console.log("filling");
  }
}

//FOR FILLING ACTION
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

//FOR PREVENTING THE RIGHT CLICK
function handleCM(event) {
  event.preventDefault();
}

//FOR SAVING THE IMAGE
function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}

//DEFINING THE FUNCTIONS
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}
Array.from(modeBtn).forEach((mode) => {
  mode.addEventListener("click", handleModeClick);
});

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
