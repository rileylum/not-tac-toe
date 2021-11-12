import React, {useState} from "react";
import { useMutation } from "@apollo/client";
import { CREATE_GAME } from "../utils/mutations";
import './Setup.css';

function OnlineSetup({setup, handleUpdate}) {
    const {boardNum, boardSize} = setup;
    const [newSetup, setNewSetup] = useState({boardNum: boardNum, boardSize })

    const [createGame] = useMutation(CREATE_GAME);

    function handleChange(evt, action) {
        const newState = {...newSetup};
        if(action === "increment") {
            newState[evt.target.id] += 1;
        } else if (action === "decrement") {
            newState[evt.target.id] -= 1;
        }
        setNewSetup({...newState});
    }

    async function handleCreateGame() {
        const boards = createBoards(newSetup.boardNum, newSetup.boardSize);
        console.log(boards);
        const newGame = await createGame({variables: {boards}});
        handleUpdate({boardNum: newSetup.boardNum, boardSize: newSetup.boardSize, game_id: newGame.data.createGame._id})
    }

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

    return (
        <div className="Setup">
            <div className="Setup-wrapper">
            <div className="Setup-inputwrapper">
            <h1>Number of Boards:</h1>
            <div className="Setup-input">
                <div className="button col col-1">
                    <button id="boardNum" onClick={(evt)=>handleChange(evt, "decrement")} disabled={newSetup.boardNum <= 1}>-</button>
                </div>
                <div className="number col col-2">
                    <h2 id="count">{newSetup.boardNum}</h2>
                </div>
                <div className="button col col-1">
                    <button id="boardNum" onClick={(evt)=>handleChange(evt, "increment")} disabled={newSetup.boardNum >= 5}>+</button>
                </div>
            </div>
            </div>
            <div className="Setup-inputwrapper">
            <h1>Board Size (nxn):</h1>
            <div className="Setup-input">
                <div className="button col col-1">
                    <button id="boardSize" onClick={(evt)=>handleChange(evt, "decrement")} disabled={newSetup.boardSize <= 3}>-</button>
                </div>
                <div className="number col col-2">
                    <h2 id="count">{newSetup.boardSize}</h2>
                </div>
                <div className="button col col-1">
                    <button id="boardSize" onClick={(evt)=>handleChange(evt, "increment")} disabled={newSetup.boardSize >= 5}>+</button>
                </div>
            </div>
            </div>
            </div>
            <div className="Setup-startgame">
            <button onClick={() => handleCreateGame({boardNum: newSetup.boardNum, boardSize: newSetup.boardSize})}><h2>CREATE GAME</h2></button>
            </div>
      </div>
    )
}

export default OnlineSetup;