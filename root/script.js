const canvas = document.getElementById("tela");
const ctx = canvas.getContext("2d");
const sizeInput = document.getElementById("sizeInput");
const selectedColor = document.getElementById("selectedColor");

canvas.width = window.innerWidth - 60;
canvas.height = 600;

const pen = {
  active: false,
  moving: false,
  pos: { x: 0, y: 0 },
  lastPos: null,
  size: 2,
  color: "#000",
  type: "brush",
};

sizeInput.addEventListener("input", () => {pen.size = sizeInput.value})

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchcancel", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);


function start(event) {
  pen.active = true
  ctx.beginPath();
  ctx.moveTo(event.clientX - canvas.offsetLeft, 
            event.clientY - canvas.offsetTop);
  event.preventDefault();
}

function draw(event) {
  if (pen.active && pen.type === "brush") {
    ctx.lineTo(event.clientX - canvas.offsetLeft, 
      event.clientY - canvas.offsetTop);
      ctx.strokeStyle = pen.color;
      ctx.lineWidth = pen.size;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
  }
}

function stop(event) {
  if (pen.active) {
    ctx.stroke();
    pen.active = false;
  }
  event.preventDefault();
}

function getColor(_this, color) {
  pen.color = color;
  selectedColor.style.backgroundColor = color;
}