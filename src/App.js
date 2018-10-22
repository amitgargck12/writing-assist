import React, { Component } from "react";
import "./App.css";
import CanvasComponent from "./components/CanvasComponent";
import Controls from './components/Controls'; 

class App extends Component {
  render() {
    return (
      <div className="App">
        <CanvasComponent letter="abcd efgh ijkl mnop qrst" height={(window.innerHeight-60)} width={window.innerWidth}/>
      </div>
    );
  }
}

export default App;
