const express = require('express');
const index = express();
require('dotenv').config()

const PORT = process.env.SERVER_PORT

index.listen(PORT, () => {
    console.log(`Server listening on port:${PORT}`)
})
