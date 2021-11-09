import React from "react";
import './Square.css';


function Square({board_id, cell_id, value, complete, clickHandler}) {
    return (
        <button onClick={() => clickHandler(board_id, cell_id)} className="Square" disabled={value || complete}><span>{value ? "X" : ""}</span></button>
    )
}

export default Square;