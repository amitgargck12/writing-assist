import React, { Component } from "react";

export default class CanvasComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { lastX: 0, lastY: 0, letter: props.letter };
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleCompare = this.handleCompare.bind(this);
  }
  componentDidMount() {
    let can = document.getElementById("can");
    this.ctx = can.getContext("2d");
    can.addEventListener("touchstart", this.handleTouchStart, false);
    can.addEventListener("touchmove", this.handleTouchMove, true);
    can.addEventListener("touchend", this.handleTouchEnd, false);
    this.offsetLeft = can.offsetLeft;
    this.offsetTop = can.offsetTop;
    this.ctx.font = `${this.props.lineWidth*25}px sans-serif`;
    let baseColorArray = ['00','00','00'];
    baseColorArray[this.props.colorIndexConfig.base]='FF';
    this.ctx.fillStyle = "#"+baseColorArray.join('');
    this.ctx.textAlign = "center";
    // this.ctx.fillText("abcd  efgh", 20, 90);
    // this.ctx.fillText("ijkl  mnop", 20, 190);
    // this.ctx.fillText("qrst  uvwx", 20, 290);
    // this.ctx.fillText("yz", 20, 390);
    this.ctx.fillText("A", can.width/2, 390);
    this.canvas = can;
    this.initialData = this.ctx.getImageData(0, 0, can.width, can.height);
    console.log(this.canvas.width);
  }
  drawCurve(ctx, x, y, size) {
    const { lastX, lastY } = this.state;
    if (lastX && lastY && (x !== lastX || y !== lastY)) {
      ctx.fillStyle = "#000000";
      ctx.lineWidth = 2 * size;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    this.setState({ lastX: x, lastY: y });
  }
  handleCompare() {
    let rowWidth = this.canvas.width;
    let columnHeight = this.canvas.height;

    let correctPixels = 0;
    let wrongPixels = 0;
    let missedPixels = 0;
    let evaluator = new Evaluator(
      this.initialData.data,
      rowWidth,
      this.props.colorIndexConfig
    );
    for (var i = 0; i < columnHeight; i++) {
      let newImageData = this.ctx.getImageData(0, i, this.canvas.width, 1);
      evaluator.setRowData(i, newImageData.data);
      for (var j = 0; j < rowWidth; j++) {
        evaluator.setCellData(j);
        if (evaluator.isNotBlank()) {
          if (evaluator.hasBeenDrawn()) {
            if (evaluator.hasBeenDrawnCorrect()) {
              evaluator.markCorrect();
              correctPixels++;
            } else {
              evaluator.markWrong();
              wrongPixels++;
            }
            this.ctx.putImageData(newImageData, 0, i);
          } else {
            missedPixels++;
          }
        }
      }
    }
    console.log(missedPixels, correctPixels, wrongPixels);
  }
  handleTouchStart(e) {
    this.setState({ mouseIsDown: true });
    this.handleTouchMove(e);
  }
  handleTouchMove(e) {
    e.preventDefault();
    let canX = e.targetTouches[0].pageX - this.offsetLeft;
    let canY = e.targetTouches[0].pageY - this.offsetTop;
    if (this.state.mouseIsDown) {
      this.drawCurve(this.ctx, canX, canY, this.props.lineWidth);
    }
  }
  handleTouchEnd() {
    this.setState({ mouseIsDown: false, lastX: 0, lastY: 0 });
  }
  render() {
    const { height, width } = this.props;
    return (
      <div>
        <div>
          <button onClick={this.handleCompare}>Compare</button>
        </div>
        <canvas
          id="can"
          height={height}
          width={width}
          style={{ backgroundColor: "white", border: "1px solid blue" }}
        />
      </div>
    );
  }
}

function Evaluator(oldArray, rowWidth, colorIndexConfig) {
  this.oldArray = oldArray;
  this.rowWidth = rowWidth;
  this.colorIndexConfig = colorIndexConfig;

  this.setRowData = (i, newArray) => {
    this.i = i;
    this.newArray = newArray;
  };

  this.setCellData = j => {
    this.j = j;
  };

  this.isNotBlank = function() {
    let index = 4 * this.j;
    return !(
      this.newArray[index] === 0 &&
      this.newArray[index + 1] === 0 &&
      this.newArray[index + 2] === 0 &&
      this.newArray[index + 3] === 0
    );
  };
  this.hasBeenDrawn = function() {
    return this.newArray[4 * this.j + colorIndexConfig.base] < 255;
  };
  this.hasBeenDrawnCorrect = function() {
    let oldIndex = this.i * this.rowWidth * 4 + 4 * this.j;
    return this.oldArray[oldIndex + colorIndexConfig.base] > 0;
  };
  this.markCorrect = function() {
    let oldIndex = this.i * this.rowWidth * 4 + 4 * this.j;
    let newValues = [0, 0, 0, this.oldArray[oldIndex + 3]];
    newValues[colorIndexConfig.correct] = 255;
    updateRowValues(this.newArray, 4 * this.j, newValues);
  };
  this.markWrong = function(newArray, j) {
    let newValues = [0, 0, 0, 190];
    newValues[colorIndexConfig.wrong] = 255;
    updateRowValues(this.newArray, 4 * this.j, newValues);
  };

  function updateRowValues(array, startIndex, values) {
    values.forEach((val, index) => (array[startIndex + index] = val));
  }
}
