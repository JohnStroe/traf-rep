const express = require('express');
const app = express();
require('dotenv').config()
const {Client} = require('pg')
const {insertQuery, getClientId, pick} = require("./helpers");
const {PORT, X_API_KEY, CLIENT_ID_KEY} = require("./constaants")


app.use(express.json());

const pgClient = new Client()

app.listen(PORT, async () => {
    await pgClient.connect()
    app.pgClient = pgClient
    console.log('Database connected')
    console.log(`Server listening on port:${PORT}`)
})

//get request
/**
 *  @typedef Params
 *  @property {string} magicLink
 */

app.post('/ingest', async (req, res) => {
    if (!req.headers[X_API_KEY]) {
        res.status(401).send('unauthorized access');
        return;
    }
    const clientId = await getClientId(req, res, app.pgClient)
    try{
        const ip = req.body.ip_address;
        const locRes = await fetch(`https://ipapi.co/${ip}/json/`,
             {
                 headers: {
                     accept: "application/json"
                 }

        })
        if (!locRes.ok) {
            res.status(500).send('location api error');
            return;
        }
        const locData = await locRes.json();

        const insertRes = await app.pgClient.query(insertQuery({
            ...req.body,
            ...pick(locData),
            [CLIENT_ID_KEY]: clientId
        }));
        console.log("som")
    } catch (err) {
        console.error(err);
    }
})



app.get('report/:magicLink',
    async (req, res) => {
        const magicLink = req.params.magicLink;
        const clientId = await getClientId(req, res, app.pgClient)
    });

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