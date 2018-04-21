const express = require('express');
const pool = require('../modules/pool');

const router = express.Router()

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM reflection`;
    pool.query(queryText).then((response) => {
        res.send(response.rows);
    }).catch((error) => {
        console.log('error getting', error);
        res.sendStatus(500);
    })
})

module.exports = router;