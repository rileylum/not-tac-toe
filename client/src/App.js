import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from "./Game";
import Home from "./pages/Home";

import './App.css'

function App() {
  return (
    <div className="container">
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game boardNum={1} boardSize={3}/>} />
      </Routes>
    </Router>
    </div>
  )
}

export default App;
