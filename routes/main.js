#!/usr/bin/env node

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('https://simple-rest-api-rs.vercel.app');
});

module.exports = router;
