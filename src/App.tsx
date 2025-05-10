import React from "react";
import { Header } from "./shared/Header";
import "./App.scss";
import { Article } from "./shared/Article";

function App() {
  return (
    <div className="App">
      <div className="App__header">
        <Header />
      </div>
      <Article />
    </div>
  );
}

export default App;
