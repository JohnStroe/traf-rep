// noinspection SqlResolve,SqlInsertValues

const {expect} = require("chai")
const {insertQuery, pick} = require("../helpers");

describe('Helpers', () => {

    describe('insertQuery', () => {

        it('should return a valid insert query', () => {

            const tData = {
                key1: "value1",
                key2: 55,
                key3: true
            }

            expect(insertQuery(tData)).to.eq(
                "insert into accessdata (key1, key2, key3) values (value1, 55, true)")
        })

    })

    describe('', () => {

        it('should return a valid insert query', () => {

            const tData = {
                key1: "value1",
                key2: 55,
                key3: true,
                key4: "ceva",
                key5: 5,
                key6: false
            }
            const tKeys = [
                "key3", "key4" , "key5"
            ]


            expect(pick(tData, tKeys)).to.deep.eq({ key3: true, key4: 'ceva', key5: 5 })
        })

    })

})