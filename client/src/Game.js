import React, {useEffect, useState} from "react";
import Board from './Board';


function Game({boardSize = 3}) {

    // set up 3x3 gameboard in state
    const [gameState, setGameState] = useState({
        board: Array.from(Array(boardSize**2)).map(() => false),
        gameOver: false
    });

    function handeClick(evt) {
        if (!gameState.gameOver) {
            const clickedCell = parseInt(evt.target.id)
            const newBoard = flipCell(clickedCell);         
            const newGameOver = isGameOver(clickedCell);
            console.log(gameState.gameOver, newGameOver);
            setGameState({...gameState, board: newBoard, gameOver: newGameOver});
        }
    }

    function flipCell(cell_id) {
        const oldBoard = gameState.board;
        const newBoard = oldBoard.map((cell, idx) => {
            if (idx === cell_id) {
                return !cell;
            }
            return cell;
        });
        return newBoard;
    }

    function isGameOver(clickedCell) {
        console.log(`is game over ${clickedCell}`);
        const cellRow = Math.floor((clickedCell)/boardSize);
        const cellCol = (clickedCell)%boardSize;

        // check row
        let rowCheck = true;
        for (let i = cellRow*boardSize; i < cellRow*boardSize+boardSize; i++) {
            if(i !== clickedCell) {
                if (!gameState.board[i]) {rowCheck = false};
            }
        }
        if (rowCheck) {
            return true;
        }

        // check column
        let colCheck = true;
        for (let i = cellCol; i < boardSize**2; i += boardSize) {
            if (i !== clickedCell) {
 
                if(!gameState.board[i]) {colCheck = false};
            }
        }
        if (colCheck) {
            return true;
        }

        // check diagonal
        let diagCheck;
        console.log(cellCol, cellRow);
        if (cellCol === cellRow) {
            // left to right
            diagCheck = true;
            for (let i = 0; i < boardSize**2; i+=(boardSize+1)) {
                if (i !== clickedCell) {
                    if(!gameState.board[i]) {diagCheck = false};
                }
            }
            if (diagCheck) {
                return true;
            }

            // NOT CHECKING RIGHT TO LEFT

        }
        return false;
    }

    return (
        <div>
            <h1>GAME COMPONENT</h1>
            <Board gameBoard={gameState.board} gameOver={gameState.gameOver} boardSize={boardSize} clickHandler={handeClick}/>
            {gameState.gameOver && (<p>GAME OVER</p>)}
        </div>
    )
}

export default Game;