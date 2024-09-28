#!/usr/bin/env node

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('https://github.com/RidwanzAnphelibelll/SimpleRestApi#readme');
});

module.exports = router;