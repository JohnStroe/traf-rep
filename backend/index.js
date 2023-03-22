const express = require('express');
const index = express();
require('dotenv').config()
const {Client} = require('pg')


const PORT = process.env.SERVER_PORT
const pgClient = new Client()

await pgClient.connect()

index.listen(PORT, () => {
    console.log(`Server listening on port:${PORT}`)
})
