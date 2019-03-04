const express = require('express');
const router = express.Router();
const {
    name,
    version,
    description
} = require('../package');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({
        name,
        description,
        version,
        uptime: process.uptime()
    });
});

module.exports = router;
