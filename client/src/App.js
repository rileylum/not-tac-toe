import React, {useState} from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Game from "./Game";
import Home from "./pages/Home";
import Setup from "./pages/Setup";

import { useQuery } from "@apollo/client";

import './App.css'
import { GET_BOOKS } from "./utils/queries";

function App() {

  const [setup, setSetup] = useState({boardNum: 1, boardSize: 3});
  const navigate = useNavigate();

  const {loading, data} = useQuery(GET_BOOKS);

  if (loading === false) {
    console.log(data)
  }

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
