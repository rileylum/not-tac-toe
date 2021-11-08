import React from "react";
import Square from './Square'
import './Board.css'

function Board({board_id, board, boardSize, clickHandler}) {

    let gridStyle = {gridTemplateColumns: `repeat(${boardSize}, 50px)`, gridTemplateRows: `repeat(${boardSize}, 50px)`}

    return (
    <div className="Board" style={gridStyle}>
        {board.map((cell, idx) => {
            return (<Square board_id={board_id} cell_id={idx} key={`cell-${idx}`} value={cell} clickHandler={clickHandler} />)
        })}
        
    </div>
    );
}

export default Board;