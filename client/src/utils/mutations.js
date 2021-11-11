import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                _id
                username
                wins
                losses
            }
        }
    }
`

export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!) {
        addUser (username: $username, password: $password) {
            token
            user {
                _id
                username
                wins
                losses
            }
        }
    }
`

export const INCREMENT_WIN = gql`
    mutation incrementWin($username: String!) {
        incrementWin (username: $username) {
            user {
                _id
                username
                wins
            }
        }
    }
`

export const INCREMENT_LOSS = gql`
    mutation incrementLoss($username: String!) {
        incrementLoss (username: $username) {
            user {
                _id
                username
                losses
            }
        }
    }
`