import React from "react";

import './Square.css';

function Square({board_id, cell_id, value, complete, mode, playerOneNext, clickHandler}) {

    function handeClick() {
        if (mode === 'computer' && playerOneNext) {
            return;
        } else {
            clickHandler(board_id, cell_id)
        }
    }

    const classes = getClasses();

    function getClasses() {
        if(mode === 'computer' && playerOneNext) {
            return "Square computer-turn"
        } else {
            return "Square"
        }
    }

    return (
        <button onClick={handeClick} className={classes} disabled={value || complete}><span>{value ? "X" : ""}</span></button>
    )
}

export default Square;