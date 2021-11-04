import React from "react";

function Square({id, value, clickHandler}) {
    return (
        <td id={id} onClick={clickHandler}>{value ? "X" : "O"}</td>
    )
}

export default Square;