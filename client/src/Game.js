import React, {useState} from "react";


function Game() {

    // set up 3x3 gameboard in state
    const [gameBoard, setGameBoard] = useState(Array.from(Array(9)).map(() => false));

    function handeClick(evt) {
        console.log(evt.target.id);

        const newBoard = gameBoard.map((cell, idx) => {
            console.log(idx, evt.target.id);
            if (idx == evt.target.id) {
                console.log(!cell);
                return !cell;
            }
            return cell;
        })

        console.log(newBoard);

        setGameBoard(newBoard);

    }

    return (
        <div>
            <h1>GAME COMPONENT</h1>
            <table>
                <tr>
                    <td id="0" onClick={handeClick}>{gameBoard[0] ? "X" : "O"}</td>
                    <td id="1" onClick={handeClick}>{gameBoard[1] ? "X" : "O"}</td>
                    <td id="2" onClick={handeClick}>{gameBoard[2] ? "X" : "O"}</td>
                </tr>
                <tr>
                    <td id="3" onClick={handeClick}>{gameBoard[3] ? "X" : "O"}</td>
                    <td id="4" onClick={handeClick}>{gameBoard[4] ? "X" : "O"}</td>
                    <td id="5" onClick={handeClick}>{gameBoard[5] ? "X" : "O"}</td>
                </tr>
                <tr>
                    <td id="6" onClick={handeClick}>{gameBoard[6] ? "X" : "O"}</td>
                    <td id="7" onClick={handeClick}>{gameBoard[7] ? "X" : "O"}</td>
                    <td id="8" onClick={handeClick}>{gameBoard[8] ? "X" : "O"}</td>
                </tr>
            </table>

        </div>
    )
}

export default Game;