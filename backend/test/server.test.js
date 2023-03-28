// noinspection SqlResolve,SqlInsertValues
const path = require("path");
require('dotenv').config({path: path.resolve(__dirname, "../.env")})
const {expect} = require("chai")
const tData = require("./__fixtures/Ingest.json")
const {X_API_KEY, CONTENT_TYPE} = require("../constaants");
const {pick} = require("../helpers");

const PORT = process.env["SERVER_PORT"]
describe('Server', () => {
    describe('ingest route', () => {

        it('should ingest data', async () => {

            const url = `http://localhost:${PORT}/ingest`
            let i = 0
            try {
                for (let td of tData) {
                    const res = await fetch(url, {
                        method: "POST",
                        headers: {
                            ...CONTENT_TYPE,
                            [X_API_KEY]: td["magic_link"]
                        },
                        body: JSON.stringify(pick(td, ["ip_address", "user_agent", "datetime"]))
                    })
                    i++
                    if(!res.ok) break
                }
            } catch (err) {
                console.error(err)
            }
            expect(i).to.eq(99)
        }).timeout(20000)
    })
})