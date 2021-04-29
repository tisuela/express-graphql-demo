# Express GraphQL API 

## Installation

Get this repository on your machine by cloning it!

```
git clone https://github.com/nananananate/express-graphql-demo
```

Navigate into the repository.

```
cd express-graphql-demo
```

Now install the dependencies needed.  
If you're curious on what the dependencies are, we explain them later.

```
npm install
```

You are now ready to run the demo!

## Running the app

For learning purposes, there are two apps (or servers) that you can run!

### The Basic server

The basic server runs by using this command:

```
node server-basic
```

With `server-basic` being the name of the file holding our basic server, `server-basic.js`.

**Now your server is running on [localhost:8000](http://localhost:8000**)

### A More Advanced Server

This server more closely reflects a real-world Express GraphQL API. It is modeled after [PeterPortal API](https://api.peterportal.org/docs).

The more advanced server can be run with this command:

```
node server
```

Since `server.js` is the expected name, you can also run the app with this command:

```
npm start
```

**Now your server is running on [localhost:8080](http://localhost:8080)**

Note that the port is now `8080`! It is a different port so that you can run both servers concurrently to compare them. 

## Dependencies

These dependencies are installed when you run `npm install`, but let's explain why we use them! 

### `express`

[`express`](https://graphql.org/graphql-js/) is a Node.js web framework, typically used for a back-end web app. And if you know back-end, you know that you'll be making a Web API!

### `graphql`

Recall that GraphQL is a *language*, not a tool. The [`graphql`](https://graphql.org/graphql-js/) dependency is the official Javascript implementation of GraphQL, developed by the [GraphQL Organization](https://graphql.org/).

### `express-graphql`. 

[`express-graphql`](https://www.npmjs.com/package/express-graphql) is what links `graphql` with `express`. Without it, there would be no GraphQL endpoint on your Express app! 
