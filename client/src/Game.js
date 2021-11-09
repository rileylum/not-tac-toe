import React, {useEffect, useState} from "react";
import Board from './Board';

import './Game.css'

function Game({boardNum = 3, boardSize = 3}) {
    // set up 3x3 gameboard in state
    const [gameState, setGameState] = useState({
        boards: createBoards(boardNum, boardSize),
        gameOver: false,
        playerOneNext: true,
    });

    useEffect(() => {
        if (isGameOver()) {
            setGameState({...gameState, gameOver: true})
        }
    }, [gameState.boards]);

    // create object which contains each board
    function createBoards(boardNum, boardSize) {
        const boards = [];
        for (let i = 0; i < boardNum; i++) {
            let board = {
                board_id: i,
                board: Array(boardSize**2).fill(false),
                complete: false
            };
            boards.push(board);
        }
        return boards;
    }
    // check if all boards are completed
    function isGameOver() {
        for (let board of gameState.boards) {
            if (!board.complete) {
                return false;
            }
        }
        return true;;
    }

    function handeClick(board_id, cell_id) {
        // deep clone state
        const oldState = JSON.parse(JSON.stringify(gameState));
        const newBoards = oldState.boards;
        // create reference of clicked board
        const currentBoard = newBoards[board_id];
        // flip clicked cell
        currentBoard.board[cell_id] = !currentBoard.board[cell_id];
        // check if clicked board is complete
        currentBoard.complete = isBoardComplete(currentBoard.board, cell_id);
        // update game state with new boards and change current player
        setGameState({...gameState, boards: newBoards, playerOneNext: !oldState.playerOneNext});
    }

    function isBoardComplete(currentBoard, cell_id) {
        const cellRow = Math.floor((cell_id)/boardSize);
        const cellCol = (cell_id)%boardSize;

        // check row
        let rowCheck = true;
        for (let i = cellRow*boardSize; i < cellRow*boardSize+boardSize; i++) {
            if(i !== cell_id) {
                if (!currentBoard[i]) rowCheck = false;
            }
        }
        if (rowCheck) return true;

        // check column
        let colCheck = true;
        for (let i = cellCol; i < boardSize**2; i += boardSize) {
            if (i !== cell_id) {
 
                if(!currentBoard[i]) colCheck = false;
            }
        }
        if (colCheck) return true;

        // check diagonals
        let diagCheck;
        // left to right
        if (cellCol === cellRow) {
            diagCheck = true;
            for (let i = 0; i < boardSize**2; i+=(boardSize+1)) {
                if (i !== cell_id) {
                    if(!currentBoard[i]) diagCheck = false;
                }
            }
            if (diagCheck) return true;
        }

        // right to left
        if ((cellCol+cellRow) === boardSize-1) {
            diagCheck = true;
            for (let i = boardSize-1; i < boardSize**2-1; i += (boardSize-1)) {
                if (i !== cell_id) {
                    if (!currentBoard[i]) diagCheck = false;
                }
            }
            if (diagCheck) return true;
        }

        return false;
    }

    return (
        <div className="Game">
            <h1>GAME COMPONENT</h1>
            <div className="Game-boardwrapper">
            {gameState.boards.map((board) => {
                return (<Board key={`board-${board.board_id}`} boardSize={boardSize} clickHandler={handeClick} {...board}/>)
            })}
            </div>
            {!gameState.gameOver &&
            (<p className="Game-currentplayer">
                <span style={{opacity: `${gameState.playerOneNext ? "0.5" : "1"}`}}>Player One</span>
                <span style={{opacity: `${gameState.playerOneNext ? "1" : "0.5"}`}}>Player Two</span>
            </p>)
            }
            {gameState.gameOver && (<p>GAME OVER</p>)}
            {gameState.gameOver && (gameState.playerOneNext ? (<p>Player One Wins</p>) : (<p>Player Two Wins</p>))}
        </div>
    )
}

export default Game;