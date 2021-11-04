import React from "react";
import './Square.css';


function Square({id, value, clickHandler}) {
    return (
        <button id={id} onClick={clickHandler} className="Square">{value ? "X" : "O"}</button>
    )
}

export default Square;