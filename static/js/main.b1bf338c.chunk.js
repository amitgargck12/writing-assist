(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(t,e,n){},16:function(t,e,n){},18:function(t,e,n){"use strict";n.r(e);var a=n(0),i=n.n(a),o=n(8),r=n.n(o),s=(n(14),n(2)),h=n(3),c=n(5),l=n(4),d=n(6),u=(n(16),n(1)),f=function(t){function e(t){var n;return Object(s.a)(this,e),(n=Object(c.a)(this,Object(l.a)(e).call(this,t))).state={lastX:0,lastY:0,letter:t.letter},n.handleTouchStart=n.handleTouchStart.bind(Object(u.a)(Object(u.a)(n))),n.handleTouchMove=n.handleTouchMove.bind(Object(u.a)(Object(u.a)(n))),n.handleTouchEnd=n.handleTouchEnd.bind(Object(u.a)(Object(u.a)(n))),n.handleCompare=n.handleCompare.bind(Object(u.a)(Object(u.a)(n))),n}return Object(d.a)(e,t),Object(h.a)(e,[{key:"componentDidMount",value:function(){var t=document.getElementById("can");this.ctx=t.getContext("2d"),t.addEventListener("touchstart",this.handleTouchStart,!1),t.addEventListener("touchmove",this.handleTouchMove,!0),t.addEventListener("touchend",this.handleTouchEnd,!1),this.offsetLeft=t.offsetLeft,this.offsetTop=t.offsetTop,this.ctx.font="".concat(25*this.props.lineWidth,"px sans-serif");var e=["00","00","00"];e[this.props.colorIndexConfig.base]="FF",this.ctx.fillStyle="#"+e.join(""),this.ctx.textAlign="center",this.ctx.fillText("A",t.width/2,390),this.canvas=t,this.initialData=this.ctx.getImageData(0,0,t.width,t.height),console.log(this.canvas.width)}},{key:"drawCurve",value:function(t,e,n,a){var i=this.state,o=i.lastX,r=i.lastY;o&&r&&(e!==o||n!==r)&&(t.fillStyle="#000000",t.lineWidth=2*a,t.beginPath(),t.moveTo(o,r),t.lineTo(e,n),t.stroke()),t.fillStyle="#000000",t.beginPath(),t.arc(e,n,a,0,2*Math.PI,!0),t.closePath(),t.fill(),this.setState({lastX:e,lastY:n})}},{key:"handleCompare",value:function(){for(var t=this.canvas.width,e=this.canvas.height,n=0,a=0,i=0,o=new v(this.initialData.data,t,this.props.colorIndexConfig),r=0;r<e;r++){var s=this.ctx.getImageData(0,r,this.canvas.width,1);o.setRowData(r,s.data);for(var h=0;h<t;h++)o.setCellData(h),o.isNotBlank()&&(o.hasBeenDrawn()?(o.hasBeenDrawnCorrect()?(o.markCorrect(),n++):(o.markWrong(),a++),this.ctx.putImageData(s,0,r)):i++)}console.log(i,n,a)}},{key:"handleTouchStart",value:function(t){this.setState({mouseIsDown:!0}),this.handleTouchMove(t)}},{key:"handleTouchMove",value:function(t){t.preventDefault();var e=t.targetTouches[0].pageX-this.offsetLeft,n=t.targetTouches[0].pageY-this.offsetTop;this.state.mouseIsDown&&this.drawCurve(this.ctx,e,n,this.props.lineWidth)}},{key:"handleTouchEnd",value:function(){this.setState({mouseIsDown:!1,lastX:0,lastY:0})}},{key:"render",value:function(){var t=this.props,e=t.height,n=t.width;return i.a.createElement("div",null,i.a.createElement("div",null,i.a.createElement("button",{onClick:this.handleCompare},"Compare")),i.a.createElement("canvas",{id:"can",height:e,width:n,style:{backgroundColor:"white",border:"1px solid blue"}}))}}]),e}(a.Component);function v(t,e,n){var a=this;function i(t,e,n){n.forEach(function(n,a){return t[e+a]=n})}this.oldArray=t,this.rowWidth=e,this.colorIndexConfig=n,this.setRowData=function(t,e){a.i=t,a.newArray=e},this.setCellData=function(t){a.j=t},this.isNotBlank=function(){var t=4*this.j;return!(0===this.newArray[t]&&0===this.newArray[t+1]&&0===this.newArray[t+2]&&0===this.newArray[t+3])},this.hasBeenDrawn=function(){return this.newArray[4*this.j+n.base]<255},this.hasBeenDrawnCorrect=function(){var t=this.i*this.rowWidth*4+4*this.j;return this.oldArray[t+n.base]>0},this.markCorrect=function(){var t=this.i*this.rowWidth*4+4*this.j,e=[0,0,0,this.oldArray[t+3]];e[n.correct]=255,i(this.newArray,4*this.j,e)},this.markWrong=function(t,e){var a=[0,0,0,190];a[n.wrong]=255,i(this.newArray,4*this.j,a)}}a.Component;var w=function(t){function e(){return Object(s.a)(this,e),Object(c.a)(this,Object(l.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(h.a)(e,[{key:"render",value:function(){return i.a.createElement("div",{className:"App"},i.a.createElement(f,{letter:"A",colorIndexConfig:{base:2,correct:1,wrong:0},lineWidth:16,height:window.innerHeight-60,width:window.innerWidth}))}}]),e}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})},9:function(t,e,n){t.exports=n(18)}},[[9,2,1]]]);
//# sourceMappingURL=main.b1bf338c.chunk.js.map