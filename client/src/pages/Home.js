import React from "react";
import { Link } from "react-router-dom";

import './Home.css'

function Home({handleGameMode}) {
    return (
    <div className="Home">
        <Link to="/setup">
            <button onClick={() => handleGameMode("computer")} className="Home-button">
                VS COMPUTER
            </button>
        </Link>
        <Link to="/setup">
            <button onClick={() => handleGameMode("local")} className="Home-button">
                LOCAL MULTIPLAYER
            </button>
        </Link>
        <Link to="/setup">
            <button onClick={() => handleGameMode("online")} className="Home-button">
                ONLINE MULTIPLAYER
            </button>
        </Link>
    </div>
    )
}

export default Home;