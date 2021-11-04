import React, {useState} from "react";
import Board from './Board';


function Game({boardSize = 3}) {

    // set up 3x3 gameboard in state
    const [gameBoard, setGameBoard] = useState(Array.from(Array(boardSize**2)).map(() => false));

    function handeClick(evt) {

        const clickedCell = parseInt(evt.target.id)

        // flip the value of the clicked cell
        const newBoard = gameBoard.map((cell, idx) => {
            if (idx === clickedCell) {
                return !cell;
            }
            return cell;
        });

        setGameBoard(newBoard);
    }

    return (
        <div>
            <h1>GAME COMPONENT</h1>
            <Board gameBoard={gameBoard} clickHandler={handeClick}/>
        </div>
    )
}

export default Game;