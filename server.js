// we need to import express, which is our web app!
// without it, what would we be running? Nothing lol.
const express = require('express')


// As the name implies, express-graphql is an express
// implementation of GraphQL!
// It's what creates the graphql endpoint and ties
// everything together :D
const { graphqlHTTP }= require('express-graphql');

// Remember, GraphQL isn't a library or tool, it's a language!
// This imports the library used to build GraphQL schemas! 
// And that library is handily called graphql.
var { buildSchema } = require('graphql')

var schema = buildSchema(`
    type Query{
        message: String
    }

`);

var root = {
    message: () => 'Hello World!'
};


// Create the express web app!
var app = express();

// Register our GraphQL endpoint
app.use(

    // the url path for the graphql endpoint. You can name this anything!
    '/graphql',

    // now the graphql stuff!
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    })
);

app.listen(
    8000, 
    () => console.log('Express GraphQL API now running on localhost:8000/graphql')
);