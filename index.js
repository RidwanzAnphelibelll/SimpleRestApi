#!/usr/bin/env node

const cors = require('cors');
const path = require('path');
const chalk = require('chalk');
const express = require('express');
const PORT = process.env.PORT || 3000;
const apirouter = require('./routes/api.js');

const app = express();

app.enable('trust proxy');
app.set('json spaces', 2);
app.use(cors());

app.use((req, res, next) => {
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    next();
  } else {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
});

app.use(express.static('lib'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/api', apirouter);

app.listen(PORT, () => {
  console.log(chalk.green(`Server running on port ${PORT}`));
});

module.exports = app;