const {X_API_KEY, ACCEPTED_LOC_KEYS} = require("./constaants");
const insertQuery = o => {
    const keys = Object.keys(o).join(", ");
    const values = Object.values(o).map(el => typeof el === "string" ? `'${el}'` : el.toString()).join(", ");
    return`insert into accessdata (${keys}) values (${values})`;
}

const getClientId = async (req, res, pgClient) => {
    const userQuery = `SELECT *
                       FROM client
                       WHERE magic_link = '${req.headers[X_API_KEY]}'`


    try {
        const user = await pgClient.query(userQuery);
        if (!user.rows.length) {
            res.status(404).send('user not found');
            return;
        }
        return user.rows[0].id;
    } catch(err){
        console.error(err)
        return -1
    }
}

/**
 * @param {object} o
 * @param {string[]} keys
 * @returns {object}
 */
const pick = (o, keys= ACCEPTED_LOC_KEYS) =>
    Object.keys(o).reduce((acc, key) =>{
        if(keys.includes(key)){
            acc[key] = o[key]
        }
        return acc
    },{})


module.exports = {
    insertQuery,
    getClientId,
    pick
}