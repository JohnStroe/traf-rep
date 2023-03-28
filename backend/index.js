const express = require('express');
const app = express();
require('dotenv').config()
const {Client} = require('pg')
app.use(express.json());

const X_API_KEY = 'x-api-key'
const PORT = process.env.SERVER_PORT
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

// app.get('report/:magicLink',
//     async (req, res) => {
//         const magicLink = req.params.magicLink;
//
//         const userQuery = `SELECT *
//                            FROM client
//                            WHERE magic_link = '${magicLink}'`
//
//
//         try {
//             const user = await app.pgClient.query(userQuery);
//             const accessQuery = `SELECT ip_address
//                                  FROM access
//                                  WHERE client_id = ${user.rows[0].id}`
//             const access = await app.pgClient.query(accessQuery);
//             if (access.rowCount > 0) {
//                 const ipAddresses = access.rows.map(row => row.ip_address);
//                 const responses = [];
//                 ipAddresses.forEach(ipAddress => {
//
//                 }); // access.ip_adress need to be sent to https://ipapi.co/#api to get user data back
//             } else {
//                 res.status(404).send(`User with id ${req.params.magicLink} not found`);
//             }
//         } catch (error) {
//             console.error(error);
//             res.status(500).send('Internal server error');
//         }
//     });

app.post('ingest', async (req, res) => {
    if (!req.headers[X_API_KEY]) {
        res.status(401).send('unauthorized access');
        return;
    }

    const userQuery = `SELECT *
                       FROM client
                       WHERE magic_link = '${req.headers[X_API_KEY]}'`


    try {
        const user = await app.pgClient.query(userQuery);
        if (!user.rows.length) {
            res.status(404).send('user not found');
            return;
        }
        const clientId = user.rows[0].id;
        const ip = req.body.ip;
        const locRes = await fetch(`https://ipapi.co/${ip}/json/`)
        if (!locRes.ok) {
            res.status(500).send('location api error');
            return;
        }
        const locData = await locRes.json();
        const accessData = {
            ...req.body,
            ...locData
        }
        const keys = Object.keys(accessData).join(", ");
        const values = Object.values(accessData).map(el => typeof el === "string" ? el : el.toString()).join(", ");
        const query = `insert into accessData (${keys}) values (${values})`;
        const insertRes = await app.pgClient.query(userQuery);
    } catch (err) {
        console.error(err);
    }
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