import React from "react";
import { Link } from "react-router-dom";

import './Home.css'

function Home() {
    return (
    <div className="Home">
        <h1>NOT TAC TOE</h1>
        <Link to="/game">
            <button className="Home-button">
                VS COMPUTER
            </button>
        </Link>
        <Link to="/game">
            <button className="Home-button">
                LOCAL MULTIPLAYER
            </button>
        </Link>
        <Link to="/game">
            <button className="Home-button">
                ONLINE MULTIPLAYER
            </button>
        </Link>
    </div>
    )
}

export default Home;