const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');

const {typeDefs, resolvers} = require('./schemas');

async function startApolloServer(typeDefs, resolvers) {
    const PORT = process.env.PORT || 3001
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
    }); 

    await server.start();

    server.applyMiddleware({app});

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.get('*', (req, res) => {
        res.send("HI");
    })
    
    await new Promise(resolve => httpServer.listen({port:4000}, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:3001`);
    })
    
}

startApolloServer(typeDefs, resolvers);