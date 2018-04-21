const express = require('express');
const pool = require('../modules/pool');

const router = express.Router()

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM reflection`;
    pool.query(queryText).then((response) => {
        console.log('Got refs', response.rows);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error getting', error);
        res.sendStatus(500);
    })
})

module.exports = router;