const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Import our schema from schema.js! 
// You should always define your schema in a separate file, or even in another folder! 
const { schema } = require('./schema');

// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

// Note that we are running on port 8080, NOT 8000!!!
app.listen(8080, () => console.log('Express GraphQL Server Now Running On localhost:8080/graphql'));