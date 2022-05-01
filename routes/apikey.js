const express = require("express");
const router = express.Router();
require('dotenv').config();

router.get('/', (req, res) =>{
    const key = {'key': process.env.API_KEY};
    res.send(key);
});

module.exports = router;