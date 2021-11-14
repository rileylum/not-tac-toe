const { gql } = require('apollo-server-core');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        wins: Int
        losses: Int
    }

    type Auth {
        token: ID!
        user: User
    }

    type OnlineGame {
        _id: ID,
        boardNum: Int
        boardSize: Int
        boards: [Board]
        playerOneNext: Boolean
        gameOver: Boolean
        playerOne: String
        playerTwo: String
    }

    type Board {
        board_id: Int
        board: [Boolean]
        complete: Boolean
    }

    input BoardInput {
        board_id: Int
        board: [Boolean]
        complete: Boolean
    }

    type Query {
        user(username: String!): User
        onlineGame(_id: String!): OnlineGame
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, password: String!): Auth
        incrementWin: User
        incrementLoss: User
        createGame(boardNum: Int!, boardSize: Int!, boards: [BoardInput]!): OnlineGame
        playerJoin(_id: String!, username: String!): OnlineGame
        playerTurn(_id: String!, boards: [BoardInput]!, playerOneNext: Boolean!): OnlineGame
    }
`
module.exports = typeDefs;