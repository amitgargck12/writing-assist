import React, { Component } from "react";
import "./App.css";
import CanvasComponent from "./components/CanvasComponent";
import Controls from "./components/Controls";

class App extends Component {
  render() {
    let colorIndexConfig = {
      base: 2,
      correct: 1,
      wrong: 0
    };
    return (
      <div className="App">
        <CanvasComponent
          letter="A"
          colorIndexConfig={colorIndexConfig}
          lineWidth={16}
          height={window.innerHeight - 60}
          width={window.innerWidth}
        />
      </div>
    );
  }
}

export default App;
