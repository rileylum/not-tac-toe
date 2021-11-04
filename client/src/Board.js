import React from "react";
import Square from './Square'

function Board({gameBoard, clickHandler}) {
    return (
    <table>
        <tbody>
            <tr>
                <Square id={0} value={gameBoard[0]} clickHandler={clickHandler} />
                <Square id={1} value={gameBoard[1]} clickHandler={clickHandler} />
                <Square id={2} value={gameBoard[2]} clickHandler={clickHandler} />
            </tr>
            <tr>
                <Square id={3} value={gameBoard[3]} clickHandler={clickHandler} />
                <Square id={4} value={gameBoard[4]} clickHandler={clickHandler} />
                <Square id={5} value={gameBoard[5]} clickHandler={clickHandler} />
            </tr>
            <tr>
                <Square id={6} value={gameBoard[6]} clickHandler={clickHandler} />
                <Square id={7} value={gameBoard[7]} clickHandler={clickHandler} />
                <Square id={8} value={gameBoard[8]} clickHandler={clickHandler} />
            </tr>
        </tbody>
    </table>
    );
}

export default Board;