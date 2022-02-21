const canvas = document.getElementById("tela");
const ctx = canvas.getContext("2d");
const sizeInput = document.getElementById("sizeInput");

canvas.width = 600;
canvas.height = 600;

const pen = {
  active: false,
  moving: false,
  pos: { x: 0, y: 0 },
  lastPos: null,
  size: 5,
  color: "#000",
};

sizeInput.addEventListener("change", () => {
  pen.size = parseInt(sizeInput.value);
});

let drawSquare = (pos) => {
  ctx.fillStyle = "red";
  ctx.fillRect(pos.x - 5, pos.y - 5, 10, 10);
};

let drawCircle = (pos, size, color) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(pos.x - size / 2, pos.y - size / 2, size, 0, 2 * Math.PI);
  ctx.fill();
};

let drawLine = (line, size, color) => {
  ctx.lineWidth = size;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(line.lastPos.x, line.lastPos.y);
  ctx.lineTo(line.pos.x, line.pos.y);
  ctx.stroke();
};

canvas.onmousedown = (event) => {
  pen.active = true;
};
canvas.onmouseup = (event) => {
  pen.active = false;
  console.log(pen.lastPos)
};

canvas.onmousemove = (event) => {
  pen.pos.x = event.clientX;
  pen.pos.y = event.clientY;
  pen.moving = true;
};

let ciclo = () => {
  if (pen.active && pen.moving) {
    drawLine({ pos: pen.pos, lastPos: pen.lastPos }, pen.size, pen.color);
    pen.movendo = false;
  }

  pen.lastPos = { ...pen.pos };

  window.requestAnimationFrame(ciclo);
};
window.requestAnimationFrame(ciclo);

let actualBtn = null;
function getColor(_this, color) {
  if (actualBtn) actualBtn.style.border = "none";

  pen.color = color;
  _this.style.border = "2px solid rgb(255, 232, 102)";
  actualBtn = _this;
}
