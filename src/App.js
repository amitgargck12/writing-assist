import React, { Component } from "react";
import "./App.css";
import CanvasComponent from "./components/CanvasComponent";

class App extends Component {
  render() {
    return (
      <div className="App">
        <CanvasComponent height="600" width="600"/>
      </div>
    );
  }
}

export default App;
