import React from "react";
import './Square.css';


function Square({board_id, cell_id, value, clickHandler}) {
    return (
        <button onClick={() => clickHandler(board_id, cell_id)} className="Square">{value ? "X" : "O"}</button>
    )
}

export default Square;