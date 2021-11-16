import React, {useEffect, useState} from "react";
import { useQuery, useMutation } from "@apollo/client";
import {useParams} from 'react-router-dom';
import { GET_ONLINE_GAME } from "../utils/queries";
import { CREATE_GAME, JOIN_GAME, PLAYER_TURN, INCREMENT_WIN, INCREMENT_LOSS } from "../utils/mutations";
import Auth from '../utils/auth';
import {Link} from 'react-router-dom';
import Board from '../components/Board';

import './Game.css'

function OnlineGame({multiplayerNo}) {
    // set up 3x3 gameboard in state
    const [gameState, setGameState] = useState({
        boards: null,
        gameOver: false,
        boardNum: null,
        boardSize: null,
        loaded: false,
        playerOneNext: Math.random() < 0.5,
        playerOne: 'Player One',
        playerTwo: 'Player Two',
    });

    const {game_id} = useParams();

    const {loading, error, data, startPolling, stopPolling} = useQuery(GET_ONLINE_GAME, {
        variables: {id: game_id},
        pollInterval: 1500,
    } );

    const [playerTurn] = useMutation(PLAYER_TURN);
    const [incrementWin] = useMutation(INCREMENT_WIN);
    const [incrementLoss] = useMutation(INCREMENT_LOSS);

    useEffect(() => {
        if(data) {
            console.log(data);
            setGameState({
                ...gameState,
                 boardNum: data.onlineGame.boardNum,
                 boardSize: data.onlineGame.boardSize,
                 boards: data.onlineGame.boards,
                 playerOneNext: data.onlineGame.playerOneNext,
                 playerOne: data.onlineGame.playerOne,
                 playerTwo: data.onlineGame.playerTwo,
                 loaded: true
                })
        }
    }, [data]);

    // GET DATA FROM GAME

    useEffect(() => {
        // handle game over
        if (isGameOver()) {
            if (Auth.loggedIn()) {
                if(!gameState.playerOneNext) {
                    incrementWin();
                } else {
                    incrementLoss();
                }
            }
            setGameState({...gameState, gameOver: true})
        }
    }, [gameState.boards]);

    function resetGame() {
        setGameState({
            ...gameState,
            boards: createBoards(gameState.boardNum, gameState.boardSize),
            gameOver: false,
            playerOneNext: Math.random() < 0.5
        })
    }

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
        if(gameState.boards) {
            for (let board of gameState.boards) {
                if (!board.complete) {
                    return false;
                }
            }
            return true;
        }
        return false;
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
        playerTurn({variables: {id: game_id, boards: newBoards, playerOneNext: !oldState.playerOneNext}});    
        // update game state with new boards and change current player
        setGameState({...gameState, boards: newBoards, playerOneNext: !oldState.playerOneNext});
    }

    function isBoardComplete(currentBoard, cell_id) {
        const cellRow = Math.floor((cell_id)/gameState.boardSize);
        const cellCol = (cell_id)%gameState.boardSize;

        // check row
        let rowCheck = true;
        for (let i = cellRow*gameState.boardSize; i < cellRow*gameState.boardSize+gameState.boardSize; i++) {
            if(i !== cell_id) {
                if (!currentBoard[i]) rowCheck = false;
            }
        }
        if (rowCheck) return true;

        // check column
        let colCheck = true;
        for (let i = cellCol; i < gameState.boardSize**2; i += gameState.boardSize) {
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
            for (let i = 0; i < gameState.boardSize**2; i+=(gameState.boardSize+1)) {
                if (i !== cell_id) {
                    if(!currentBoard[i]) diagCheck = false;
                }
            }
            if (diagCheck) return true;
        }

        // right to left
        if ((cellCol+cellRow) === gameState.boardSize-1) {
            diagCheck = true;
            for (let i = gameState.boardSize-1; i < gameState.boardSize**2-1; i += (gameState.boardSize-1)) {
                if (i !== cell_id) {
                    if (!currentBoard[i]) diagCheck = false;
                }
            }
            if (diagCheck) return true;
        }

        return false;
    }

    return(
        <div>
        <div className="Game">
            
            {gameState.loaded  && <div className="Game-boardwrapper">
            {gameState.boards.map((board) => {
                return (<Board key={`board-${board.board_id}`} boardSize={gameState.boardSize} clickHandler={handeClick} mode="online" playerOneNext={gameState.playerOneNext} multiplayerNo={multiplayerNo} {...board}/>)
            })}
            </div> }
            {!gameState.gameOver &&
            (<p className="Game-currentplayer">
                <span style={{opacity: `${gameState.playerOneNext ? "0.5" : "1"}`}}>{gameState.playerOne} {multiplayerNo === 1 && "(you)"}</span>
                <span style={{opacity: `${gameState.playerOneNext ? "1" : "0.5"}`}}>{gameState.playerTwo} {multiplayerNo === 2 && "(you)"}</span>
            </p>)
            }
            {gameState.gameOver && (
            <div className="Game-gameover">
            <p>GAME OVER</p>
            {gameState.playerOneNext ? (<p>{gameState.playerTwo} Wins</p>) : (<p>{gameState.playerOne} Wins</p>)}
                <div className="Game-gameover-buttons">
                    <button onClick={resetGame}>Play Again</button>
                    <Link to="/">Go Back</Link>
                </div>
            </div>
            )}
        </div>
        </div>
    )
}

export default OnlineGame;