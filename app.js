const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const penBtn = document.getElementById("penBtn");
const fillBtn = document.getElementById("fillBtn");
const modeBtn = document.getElementsByClassName("modeBtn");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";

// define the size of the canvas here
const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 800;

// Set the default values here
canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// For switching painting & filling
let painting = false;
let filling = false;

// Setting the start & end of painting
function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

// For mouse move event
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // Trace the mouse move while mouseup
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    // Trace the mouse move while mousedown
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

// For choosing colors
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  //Passing "disabled" to the target color
  if (!event.target.disabled) {
    Array.from(colors).forEach((color) => (color.disabled = false));
    event.target.disabled = true;
  }
}

// For range input
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

// Paint mode event
function handleModeClick() {
  if (filling) {
    filling = false;
    penBtn.disabled = true;
    fillBtn.disabled = false;
  } else {
    filling = true;
    penBtn.disabled = false;
    fillBtn.disabled = true;
  }
}

// For filling event
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

// Preventing the right click
function handleCM(event) {
  event.preventDefault();
}

// For saving painting as an image
function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}

// Defining & handling mouse move event
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
