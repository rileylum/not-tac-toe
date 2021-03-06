import React, { useState, useEffect } from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import { useMutation, useQuery } from "@apollo/client";
import { JOIN_GAME } from "../utils/mutations";
import { GET_ONLINE_GAME } from "../utils/queries";
import Auth from '../utils/auth';

import './Lobby.css';

function Lobby({handleUpdate}) {

    const [players, setPlayers] = useState({playerOne: null, playerTwo: null});

    const {game_id} = useParams();
    const navigate = useNavigate();

    const {loading, error, data, startPolling, stopPolling} = useQuery(GET_ONLINE_GAME, {
        variables: {id: game_id},
        pollInterval: 500
    });

    // once both players have joined stop polling
    if(players.playerOne && players.playerTwo) {
        stopPolling();
    }

    const [joinGame] = useMutation(JOIN_GAME);

    useEffect(() => {
        async function tryJoin() {
            try {
                const user = Auth.loggedIn() ? Auth.getProfile().data.username : "player";
                console.log(user);
                const game = await joinGame({variables: {id: game_id, username: user}});
                if(game) {
                    if (!game.data.playerJoin.playerTwo) {
                        handleUpdate({multiplayerNo: 1})
                    } else handleUpdate({multiplayerNo:2});
                }
            } catch (err) {
                alert("Game full or does not exist")
                navigate('/');
            }
        }
        tryJoin();
    }, [])

    useEffect(() => {
        if(data) {
            if(data.onlineGame) {
                const newPlayerOne = data.onlineGame.playerOne;
                const newPlayerTwo = data.onlineGame.playerTwo;
                setPlayers({playerOne: newPlayerOne, playerTwo: newPlayerTwo});
            }
        }
    }, [data])

    return (
        <div>
            <h1>LOBBY</h1>
            <h2 className="Lobby-player">Player One: <span> {players.playerOne || "Waiting"}</span></h2>
            <h2 className="Lobby-player">Player Two: <span> {players.playerTwo || "Waiting"}</span></h2>
            {players.playerTwo && (<Link className="Start-button" to={`/game/${game_id}`}>Start Game</Link>)}
        </div>
    )
}

export default Lobby;