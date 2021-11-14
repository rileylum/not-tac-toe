import { gql } from '@apollo/client';

export const GET_USER = gql`
    query user ($username: String!) {
        user (username: $username) {
            _id
            username
            wins
            losses
        }
    }
`

export const GET_ONLINE_GAME = gql`
    query onlineGame ($id: String!) {
        onlineGame(_id: $id) {
            _id
            boardNum
            boardSize
            boards {
                board_id
                board
                complete
            }
            playerOneNext
            gameOver
            playerOne
            playerTwo
        }
    }
`