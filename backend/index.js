const express = require('express');
const app = express();
require('dotenv').config()
const {Client} = require('pg')
const {insertQuery, getClientId, pick} = require("./helpers");
const {PORT, X_API_KEY, CLIENT_ID_KEY} = require("./constaants")


app.use(express.json());

const pgClient = new Client()

const startApp = (port = PORT) => {
    app.listen(port, async () => {
        await pgClient.connect()
        app.pgClient = pgClient
        console.log('Database connected')
        console.log(`Server listening on port:${port}`)
    })
}

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
        const ip = req.body["ip_address"];
        if(!ip){
            res.status(400).send('invalid ip address');
            return;
        }
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

        if(insertRes.rowCount !== 1) {
            res.status(500).send('database insert error')
            return
        }
        res.send({
            success: true
        })
    } catch (err) {
        console.error(err);
    }
})



app.get('report/:magicLink',
    async (req, res) => {
        const magicLink = req.params.magicLink;
        const clientId = await getClientId(req, res, app.pgClient)
    });


startApp()
