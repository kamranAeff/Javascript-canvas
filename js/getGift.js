let audio = new Audio();
let step = 80,
  drawArea,
  gifts = [
    {
      category: "bronze",
      borderColor: "#34495e",
      bgColor: "#95a5a6",
      score: 10
    },
    {
      category: "silver",
      borderColor: "#c0392b",
      bgColor: "#f39c12",
      score: 20
    },
    {
      category: "gold",
      borderColor: "#16a085",
      bgColor: "#2ecc71",
      score: 30
    }
  ];

function docLoad() {
  moveWithArrows();
}

function moveWithArrows() {
  let canvas = document.getElementById("board");
  let context = canvas.getContext("2d");
  drawArea = context.contextSize(step);
  drawArea.x = Math.floor(drawArea.width / 2.0 / step % step) * step - step;
  drawArea.y = Math.floor(drawArea.height / 2.0 / step % step) * step - step;

  do {
    drawArea.gift = {
      x: getRandInt(0, Math.floor(drawArea.width / step) - 1) * step,
      y: getRandInt(0, Math.floor(drawArea.height / step) - 1) * step,
      current: gifts[getRandInt(0, gifts.length)]
    };
  } while (drawArea.x == drawArea.gift.x && drawArea.y == drawArea.gift.y);

  document.getElementById("score").style.color=drawArea.gift.current.bgColor;

  context.fillStyle = "black";
  context
    .clearCanvas()
    .drawGrid(step)
    .drawStar(
      drawArea.gift.x + step / 2,
      drawArea.gift.y + step / 2,
      5,
      step * 0.6 / 2,
      step * 0.32 / 2
    )
    .fillRect(drawArea.x, drawArea.y, step, step);

  document.onkeydown = function(event) {
    switch (event.keyCode) {
      case 37:
        drawArea.x -= step;
        drawArea.x = drawArea.x < 0 ? drawArea.width - step : drawArea.x;
        break;
      case 38:
        drawArea.y -= step;
        drawArea.y = drawArea.y < 0 ? drawArea.height - step : drawArea.y;
        break;
      case 39:
        drawArea.x += step;
        drawArea.x = drawArea.x > drawArea.width - step ? 0 : drawArea.x;
        break;
      case 40:
        drawArea.y += step;
        drawArea.y = drawArea.y > drawArea.height - step ? 0 : drawArea.y;
        break;
    }

    if (drawArea.x == drawArea.gift.x && drawArea.y == drawArea.gift.y) {
      var score = canvas.getAttribute("score");
      score = parseInt(score) + drawArea.gift.current.score;
      canvas.setAttribute("score", score);
      document.getElementById("score").innerHTML = score;

      do {
        drawArea.gift = {
          x: getRandInt(0, Math.floor(drawArea.width / step) - 1) * step,
          y: getRandInt(0, Math.floor(drawArea.height / step) - 1) * step,
          current: gifts[getRandInt(0, gifts.length)]
        };
      } while (drawArea.x == drawArea.gift.x && drawArea.y == drawArea.gift.y);

      document.getElementById("score").style.color=drawArea.gift.current.bgColor;

      audio.src = "sounds/smash.mp3";
      audio.play();
    } else {
      audio.src = "sounds/coin.mp3";
      audio.play();
    }

    context
      .clearCanvas()
      .drawGrid(step)
      .drawStar(
        drawArea.gift.x + step / 2,
        drawArea.gift.y + step / 2,
        5,
        step * 0.6 / 2,
        step * 0.32 / 2
      )
      .fillRect(drawArea.x, drawArea.y, step, step);
  };
}

//--------------- extensions

function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

CanvasRenderingContext2D.prototype.contextSize = function(step) {
  let x1 = window.getComputedStyle(this.canvas)["width"].replace("px", ""),
    y1 = window.getComputedStyle(this.canvas)["height"].replace("px", "");

  if (step > 0) {
    x1 -= x1 % step;
    y1 -= y1 % step;
  }

  return {
    width: x1,
    height: y1
  };
};

CanvasRenderingContext2D.prototype.clearCanvas = function() {
  let canvasSize = this.contextSize(step);
  this.beginPath();
  this.clearRect(0, 0, canvasSize.width, canvasSize.height);
  this.stroke();
  return this;
};

CanvasRenderingContext2D.prototype.drawGrid = function(cellWidth) {
  let x0 = 0,
    y0 = 0,
    canvasSize = this.contextSize(step);
  let fillStyle = this.fillStyle;
  this.beginPath();

  while (true) {
    if (canvasSize.width < x0) break;

    this.moveTo(x0, 0);
    this.lineTo(x0, canvasSize.height);

    this.moveTo(0, y0);
    this.lineTo(canvasSize.width, y0);

    x0 += cellWidth;
    y0 += cellWidth;
  }
  this.stroke();

  this.fillStyle = fillStyle;
  return this;
};

CanvasRenderingContext2D.prototype.drawStar = function(
  cx,
  cy,
  spikes,
  outerRadius,
  innerRadius
) {
  let fillStyle = this.fillStyle;
  let strokeStyle = this.strokeStyle;
  let lineWidth = this.lineWidth;

  var rot = Math.PI / 2 * 3;
  var x = cx;
  var y = cy;
  var step = Math.PI / spikes;

  this.beginPath();
  this.moveTo(cx, cy - outerRadius);
  for (i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    this.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    this.lineTo(x, y);
    rot += step;
  }
  this.lineTo(cx, cy - outerRadius);
  this.closePath();
  this.lineWidth = 5;
  this.strokeStyle = drawArea.gift.current.borderColor;
  this.stroke();
  this.fillStyle = drawArea.gift.current.bgColor;
  this.fill();
  this.fillStyle = fillStyle;
  this.strokeStyle = strokeStyle;
  this.lineWidth = lineWidth;
  return this;
};
