import React, { useEffect, useState } from "react";
import {useQuery} from '@apollo/client';
import {GET_USER} from '../utils/queries';
import Auth from '../utils/auth'

function Profile() {

    const [state, setState] = useState({wins: 0, losses: 0});

    const {loading, data} = useQuery(GET_USER, {variables: {username: Auth.getProfile().data.username}, pollInterval: 3000});

    useEffect(() => {
        if(data) {
            setState({wins: data.user.wins, losses: data.user.losses});
        }
    }, [data]);

    return (
        <div>
        <h1>MY PROFILE</h1>
        <h2>{!loading && data.user.username}</h2>
        <h2>Wins:{!loading && state.wins}</h2>
        <h2>Losses:{!loading && state.losses}</h2>
        </div>
    )
}

export default Profile;