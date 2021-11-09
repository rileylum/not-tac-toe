import React from "react";
import { Link } from "react-router-dom";

import './Home.css'

function Home() {
    return (
    <div className="Home">
        <Link to="/setup">
            <button className="Home-button">
                VS COMPUTER
            </button>
        </Link>
        <Link to="/setup">
            <button className="Home-button">
                LOCAL MULTIPLAYER
            </button>
        </Link>
        <Link to="/setup">
            <button className="Home-button">
                ONLINE MULTIPLAYER
            </button>
        </Link>
    </div>
    )
}

export default Home;