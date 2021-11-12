import React, {useState} from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useMutation } from "@apollo/client";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Setup from "./pages/Setup";
import OnlineSetup from "./pages/OnlineSetup";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";
import OnlineGame from "./pages/OnlineGame";
import Profile from "./pages/Profile"

import './App.css'
import SignupForm from "./pages/Signup";
import LoginForm from "./pages/Login";


function App() {

  const [setup, setSetup] = useState({boardNum: 1, boardSize: 3, mode:'computer', game_id: null});
  const navigate = useNavigate();

  function handleGameMode(mode) {
    setSetup({...setup, mode: mode})
  }

  function handleSetupUpdate(newSetup) {
    if(setup.mode === 'online') {
      console.log(newSetup);
      setSetup({...setup, ...newSetup}, navigate(`/join/${newSetup.game_id}`))
    } else {
      setSetup({...setup, ...newSetup}, navigate("/game"));
    }
  };

  return (
    <div>
      <Navbar />
    <div className="container">
      
      <Routes>
        <Route path="/" element={<Home handleGameMode={handleGameMode}/>} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/setup" element={<Setup setup={setup} handleUpdate={handleSetupUpdate}/>} />
        <Route path="/onlinesetup" element={<OnlineSetup setup={setup} handleUpdate={handleSetupUpdate}/>} />
        <Route path="/join/:game_id" element={<Lobby />} />
        <Route path="/game" element={<Game boardNum={setup.boardNum} boardSize={setup.boardSize} mode={setup.mode}/>} />
        <Route path="/game/:game_id" element={<OnlineGame boardNum={setup.boardNum} boardSize={setup.boardSize} mode={setup.mode}/>} />
      </Routes>
    </div>
    </div>
  )
}

export default App;
