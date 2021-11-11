import React from "react";
import {useQuery} from '@apollo/client';
import {GET_USER} from '../utils/queries';
import Auth from '../utils/auth'

function Profile() {

    const {loading, data} = useQuery(GET_USER, {variables: {username: Auth.getProfile().data.username}});

    console.log(data);

    return (
        <div>
        <h1>MY PROFILE</h1>
        <h2>{!loading && data.user.username}</h2>
        <h2>Wins:{!loading && data.user.wins}</h2>
        <h2>Losses:{!loading && data.user.losses}</h2>
        </div>
    )
}

export default Profile;