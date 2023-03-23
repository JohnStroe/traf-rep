const express = require('express');
const app = express();
require('dotenv').config()
const {Client} = require('pg')


const PORT = process.env.SERVER_PORT
const pgClient = new Client()

app.listen(PORT, async () => {
    await pgClient.connect()
    app.pgClient = pgClient
    console.log('Database connected')
    console.log(`Server listening on port:${PORT}`)
})

// punctul 1
// get http://localhost:3003/clients
// 100 de clients [
//      {name: "fffsd"}
// ]

// punctul 2
// get http://localhost:3003/client/:id (2, 55, 99)
// {
// name: '...'
//
// }