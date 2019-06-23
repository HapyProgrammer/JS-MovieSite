import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import Movies from "./components/movies";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <Movies />
      </div>
    );
  }
}

export default App;
