import React, {useState} from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@apollo/client";
import { CREATE_GAME } from "../utils/mutations";
import './Setup.css';

function OnlineSetup({setup, handleUpdate}) {
    const {boardNum, boardSize} = setup;
    const [newSetup, setNewSetup] = useState({boardNum: boardNum, boardSize })
    const [state, setState] = useState({page: null, game_id: null})
    const navigate = useNavigate();

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

    const handeInputChange = (evt) => {
        const {value} = evt.target;
        setState({...state, game_id: value})
    };

    const handleFormSubmit = async (evt) => {
        evt.preventDefault();
        navigate(`/join/${state.game_id}`);
    }

    async function handleCreateGame() {
        const boards = createBoards(newSetup.boardNum, newSetup.boardSize);
        const newGame = await createGame({variables: {boardNum: newSetup.boardNum, boardSize: newSetup.boardSize, boards}});
        handleUpdate({game_id: newGame.data.createGame._id})
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

        {!state.page && (
            <div className="Setup-wrapper">
                <div className="Setup-startgame Setup-inputwrapper">
                    <button onClick={() => setState({page: 'setup'})}><h2>HOST GAME</h2></button>
                    <button onClick={() => setState({page: 'join'})}><h2>JOIN GAME</h2></button>
                </div>
            </div>
        )}
        {state.page === 'join' && (
            <div className="Setup-wrapper">
                <form className="Setup-startgame Setup-inputwrapper">
                    <label className="Form-label" htmlFor="gameId">Game ID</label>
                    <input className="Form-input" type="text" id="gameId" name="gameId" value={state.game_id} onChange={handeInputChange}/>
                    <button onClick={handleFormSubmit}><h2>JOIN GAME</h2></button>
                </form>
            </div>
        )}
        {state.page === 'setup' && (
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
            <div className="Setup-startgame">
                <button onClick={() => handleCreateGame({boardNum: newSetup.boardNum, boardSize: newSetup.boardSize})}><h2>CREATE GAME</h2></button>
            </div>
            </div>)}
      </div>
    )
}

export default OnlineSetup;