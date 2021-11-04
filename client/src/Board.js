import React from "react";
import Square from './Square'
import './Board.css'

function Board({gameBoard, boardSize, clickHandler}) {

    const gridStyle = {gridTemplateColumns: `repeat(${boardSize}, 50px)`, gridTemplateRows: `repeat(${boardSize}, 50px)`}

    return (
    <div className="Board" style={gridStyle}>
        {gameBoard.map((cell, idx) => {
            return (<Square id={idx} value={cell} clickHandler={clickHandler} />)
        })}
        
    </div>
    );
}

export default Board;