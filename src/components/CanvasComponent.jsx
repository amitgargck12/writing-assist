import React, { Component } from "react";

export default class CanvasComponent extends Component {
  constructor() {
    super();
    this.state = { lastX: 0, lastY: 0 };
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }
  componentDidMount() {
    this.can = document.getElementById("can");
    this.ctx = this.can.getContext("2d");
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
  handleTouchStart(e) {
    this.setState({ mouseIsDown: true });
    this.handleTouchMove(e);
  }
  handleTouchMove(e) {
    e.preventDefault();
    let canX = e.targetTouches[0].pageX - this.can.offsetLeft;
    let canY = e.targetTouches[0].pageY - this.can.offsetTop;
    if (this.state.mouseIsDown) {
      this.drawCurve(this.ctx, canX, canY, 3);
    }
  }
  handleTouchEnd() {
    this.setState({ mouseIsDown: false, lastX: 0, lastY: 0  });
  }
  render() {
    const { height, width } = this.props;
    return (
      <div>
        <canvas
          id="can"
          height={height}
          width={width}
          style={{ backgroundColor: "white" }}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
        />
      </div>
    );
  }
}
