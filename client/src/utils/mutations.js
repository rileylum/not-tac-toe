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
    mutation incrementWin {
        incrementWin {
            _id
            username
            wins
        }
    }
`

export const INCREMENT_LOSS = gql`
    mutation incrementLoss {
        incrementLoss {
            _id
            username
            losses
        }
    }
`

export const CREATE_GAME = gql`
    mutation createGame($boardNum: Int!, $boardSize: Int!, $boards: [BoardInput]!) {
        createGame(boardNum: $boardNum, boardSize: $boardSize, boards: $boards) {
            _id,
            boardNum
            boardSize
            boards {
                board_id
                board
                complete
            }
            gameOver
            playerOneNext
            playerOne
            playerTwo
        }
    }
`
export const JOIN_GAME = gql`
    mutation playerJoin($id: String!, $username: String!) {
        playerJoin(_id: $id, username: $username) {
            _id,
            boardSize
            boardNum
            boards {
                board_id
                board
                complete
            }
            playerOneNext
            playerOne
            playerTwo
        }
    }
`

export const PLAYER_TURN = gql`
    mutation playerTurn($id: String!, $playerOneNext: Boolean! $boards: [BoardInput]!) {
        playerTurn(_id: $id, playerOneNext: $playerOneNext, boards: $boards) {
            _id
            boardNum
            boardSize
            boards {
                board_id
                board
                complete
            }
            playerOneNext
            playerOne
            playerTwo
        }
    }
`