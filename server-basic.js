/* 

This is a very basic Express GraphQL API. 
Adopted from: https://medium.com/codingthesmartway-com-blog/creating-a-graphql-server-with-node-js-and-express-f6dddc5320e1

*/

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


// Here we build a very simple schema
// This schema dictates what GraphQL returns! 
// It also dictates what can be specified when someone
// makes a query to our GraphQL API
var schema = buildSchema(`
    type Query{
        message: String
    }

`);

// This is commonly called a resolver
// In our schema, we dictate what happens.
// The resolve is where the happening happens!
// It's the how.
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


// Have our app listening on port 8000! 
app.listen(
    8000, 
    () => console.log('Express GraphQL API now running on localhost:8000/graphql')
);