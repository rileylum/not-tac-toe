import React, {useState} from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Setup from "./pages/Setup";
import Game from "./pages/Game";
import Profile from "./pages/Profile"

import './App.css'
import SignupForm from "./pages/Signup";
import LoginForm from "./pages/Login";


function App() {

  const [setup, setSetup] = useState({boardNum: 1, boardSize: 3, mode:'computer'});
  const navigate = useNavigate();

  function handleGameMode(mode) {
    setSetup({...setup, mode: mode})
  }

  function handleSetupUpdate(newSetup) {
    setSetup({...setup, ...newSetup}, navigate("/game"));
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
        <Route path="/game" element={<Game boardNum={setup.boardNum} boardSize={setup.boardSize} mode={setup.mode}/>} />
      </Routes>
    </div>
    </div>
  )
}

export default App;
