const express = require('express');
const pool = require('../modules/pool');

const router = express.Router()

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM reflection ORDER BY id`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
    console.log(req.body);
    const queryText = `INSERT INTO reflection (topic, description) VALUES ($1, $2)`;
    pool.query(queryText, [req.body.topic, req.body.description]).then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        res.sendStatus(500);
    })
})

router.delete('/:id', (req, res) => {
    const queryText = `DELETE FROM reflection WHERE id = $1`;
    pool.query(queryText, [req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(500);
    })
})

router.put('/:id', (req, res) => {
    console.log(req.body);
    const queryText = `UPDATE reflection SET topic = $1, description = $2, bookmarked = $3 WHERE id = $4`
    pool.query(queryText, [req.body.topic, req.body.description, req.body.bookmarked, req.body.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(500);
    })
})

module.exports = router;