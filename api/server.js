// implement your server here
const express = require('express');
const server = express();
// require your posts router and connect it here
// BREAK UP THIS MONOLITHIC FILE USING ROUTES
// BREAK UP THIS MONOLITHIC FILE USING ROUTES
// BREAK UP THIS MONOLITHIC FILE USING ROUTES

const postsRouter = require("./posts/posts-router.js")

server.use(express.json());
server.use("/api/posts", postsRouter)


// OTHER ENDPOINTS
// OTHER ENDPOINTS
// OTHER ENDPOINTS
server.get('/', (req, res) => {
  res.send(`
    <h2>Blog Posts API</h>
    <p>Welcome to the Blog Posts API</p>
  `);
});

module.exports = server;
