const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const path = require('path');
const http = require('http');

const {typeDefs, resolvers} = require('./schemas');
const {authMiddleware} = require('./utils/auth');
const db = require('./config/connection');

async function startApolloServer(typeDefs, resolvers) {
    const PORT = process.env.PORT || 3001
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: authMiddleware,
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
    }); 

    await server.start();

    server.applyMiddleware({app});

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/public/index.html'));
    })
    db.once( 'open', async () => {
    await new Promise(resolve => httpServer.listen({port:4000}, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:3001`);
    })
})
    
}

startApolloServer(typeDefs, resolvers);