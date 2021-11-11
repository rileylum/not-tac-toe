import React, {useState} from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';

import Home from "./pages/Home";
import Setup from "./pages/Setup";
import Game from "./pages/Game";

import './App.css'


function App() {

  const [setup, setSetup] = useState({boardNum: 1, boardSize: 3});
  const navigate = useNavigate();

  function handleSetupUpdate(newSetup) {
    setSetup({...newSetup}, navigate("/game"));
  };

  return (
    <div className="container">
      <h1>NOT TAC TOE</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<Setup setup={setup} handleUpdate={handleSetupUpdate}/>} />
        <Route path="/game" element={<Game boardNum={setup.boardNum} boardSize={setup.boardSize}/>} />
      </Routes>
    </div>
  )
}

export default App;
