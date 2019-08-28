function docLoad() {


    moveWithArrows(); 
}


function moveWithArrows() {
    let canvas = document.getElementById("canvas1");
    let context = canvas.getContext("2d"),
      step = 50;
    let drawArea = context.contextSize();
    drawArea.x = Math.floor(drawArea.width / 2.0 / step % step) * step - step;
    drawArea.y = Math.floor(drawArea.height / 2.0 / step % step) * step - step;
    drawArea.gift={
      x:getRandInt(0,Math.floor(drawArea.width/step)-1)*step,
      y:getRandInt(0,Math.floor(drawArea.height/step)-1)*step,
      score:getRandInt(10,100)
    };

    context.fillStyle = "black";
    console.log(drawArea.x, drawArea.y, step, step);
    context
      .clearCanvas()
      .drawGrid(step)
      .drawStar(drawArea.gift.x+25, drawArea.gift.y+25, 5, 15, 8)
      .fillRect(drawArea.x, drawArea.y, step, step);
      context.fillText(drawArea.gift.score,drawArea.gift.x+20,drawArea.gift.y+30, step);
      

document.onkeydown=function(event) {
    switch (event.keyCode) {
      case 37:
        drawArea.x -= step;
        drawArea.x = drawArea.x < 0 ? drawArea.width - step : drawArea.x;

        if(drawArea.x==drawArea.gift.x && drawArea.y==drawArea.gift.y)
        {
            var score=canvas.getAttribute('score');
            score=parseInt(score)+drawArea.gift.score;
            canvas.setAttribute('score',score);
            document.getElementById('score').innerHTML=score;

            drawArea.gift={
                x:getRandInt(0,Math.floor(drawArea.width/step)-1)*step,
                y:getRandInt(0,Math.floor(drawArea.height/step)-1)*step,
                score:getRandInt(10,100)
              }
        }

        context
          .clearCanvas()
          .drawGrid(step)
          .drawStar(drawArea.gift.x+25, drawArea.gift.y+25, 5, 15, 8)
          .fillRect(drawArea.x, drawArea.y, step, step);
          context.fillText(drawArea.gift.score,drawArea.gift.x+20,drawArea.gift.y+30, step);
        break;
      case 38:
        drawArea.y -= step;
        drawArea.y = drawArea.y < 0 ? drawArea.height - step : drawArea.y;

        if(drawArea.x==drawArea.gift.x && drawArea.y==drawArea.gift.y)
        {
            var score=canvas.getAttribute('score');
            score=parseInt(score)+drawArea.gift.score;
            canvas.setAttribute('score',score);
            document.getElementById('score').innerHTML=score;

            drawArea.gift={
                x:getRandInt(0,Math.floor(drawArea.width/step)-1)*step,
                y:getRandInt(0,Math.floor(drawArea.height/step)-1)*step,
                score:getRandInt(10,100)
              }
        }

        context
          .clearCanvas()
          .drawGrid(step)
          .drawStar(drawArea.gift.x+25, drawArea.gift.y+25, 5, 15, 8)
          .fillRect(drawArea.x, drawArea.y, step, step);
          context.fillText(drawArea.gift.score,drawArea.gift.x+20,drawArea.gift.y+30, step);
        break;
      case 39:
        drawArea.x += step;
        drawArea.x = drawArea.x > drawArea.width - step ? 0 : drawArea.x;

        if(drawArea.x==drawArea.gift.x && drawArea.y==drawArea.gift.y)
        {
            var score=canvas.getAttribute('score');
            score=parseInt(score)+drawArea.gift.score;
            canvas.setAttribute('score',score);
            document.getElementById('score').innerHTML=score;

            drawArea.gift={
                x:getRandInt(0,Math.floor(drawArea.width/step)-1)*step,
                y:getRandInt(0,Math.floor(drawArea.height/step)-1)*step,
                score:getRandInt(10,100)
              }
        }

        context
          .clearCanvas()
          .drawGrid(step)
          .drawStar(drawArea.gift.x+25, drawArea.gift.y+25, 5, 15, 8)
          .fillRect(drawArea.x, drawArea.y, step, step);
          context.fillText(drawArea.gift.score,drawArea.gift.x+20,drawArea.gift.y+30, step);
        break;
      case 40:
        drawArea.y += step;
        drawArea.y = drawArea.y > drawArea.height - step ? 0 : drawArea.y;

        if(drawArea.x==drawArea.gift.x && drawArea.y==drawArea.gift.y)
        {
            var score=canvas.getAttribute('score');
            score=parseInt(score)+drawArea.gift.score;
            canvas.setAttribute('score',score);
            document.getElementById('score').innerHTML=score;

            drawArea.gift={
                x:getRandInt(0,Math.floor(drawArea.width/step)-1)*step,
                y:getRandInt(0,Math.floor(drawArea.height/step)-1)*step,
                score:getRandInt(10,100)
              }
        }
        
        context
          .clearCanvas()
          .drawGrid(step)
          .drawStar(drawArea.gift.x+25, drawArea.gift.y+25, 5, 15, 8)
          .fillRect(drawArea.x, drawArea.y, step, step);
          context.fillText(drawArea.gift.score,drawArea.gift.x+20,drawArea.gift.y+28, step);
        break;
    }

    console.log(drawArea.x, drawArea.y, step, step);
  };

}



//--------------- extensions

function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  CanvasRenderingContext2D.prototype.contextSize = function() {
    let x1 = window.getComputedStyle(this.canvas)["width"].replace("px", ""),
      y1 = window.getComputedStyle(this.canvas)["height"].replace("px", "");
    return { width: x1, height: y1 };
  };
  
  CanvasRenderingContext2D.prototype.clearCanvas = function() {
    let canvasSize = this.contextSize();
    this.beginPath();
    this.clearRect(0, 0, canvasSize.width, canvasSize.height);
    this.stroke();
    return this;
  };
  
  CanvasRenderingContext2D.prototype.drawGrid = function(cellWidth) {
    let x0 = 0,
      y0 = 0,
      canvasSize = this.contextSize();
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
    
    this.fillStyle=fillStyle;
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
    this.strokeStyle = "#d35400";
    this.stroke();
    this.fillStyle = "#f1c40f";
    this.fill();
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
    return this;
  };