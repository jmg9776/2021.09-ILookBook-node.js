const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const token = require('../middleware/token/token');
const { verifyToken } = require('../middleware/token/jwt');
module.exports = router;

router.get('/token', async (req, res) => {
    res.json({token: token.mktoken('test','1m')})
});

router.get('/test', async (req, res) => {
    res.json(token.decryption(req.query.token))
});
