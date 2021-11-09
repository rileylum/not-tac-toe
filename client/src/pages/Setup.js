import React, {useState} from "react";

import './Setup.css';

function Setup({setup, handleUpdate}) {
    const {boardNum, boardSize} = setup;
    const [newSetup, setNewSetup] = useState({boardNum: boardNum, boardSize })

    function handleChange(evt, action) {
        const newState = {...newSetup};
        if(action === "increment") {
            newState[evt.target.id] += 1;
        } else if (action === "decrement") {
            newState[evt.target.id] -= 1;
        }
        setNewSetup({...newState});
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
            <button onClick={() => handleUpdate({boardNum: newSetup.boardNum, boardSize: newSetup.boardSize})}><h2>START GAME</h2></button>
            </div>
      </div>
    )
}

export default Setup;