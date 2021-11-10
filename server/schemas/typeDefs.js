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

    type Query {
        user(username: String!): User
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, password: String!): Auth
        incrementWin(username: String!): User
        incrementLoss(username: String!): User
    }
`
module.exports = typeDefs;