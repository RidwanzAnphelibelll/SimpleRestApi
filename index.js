#!/usr/bin/env node

const cors = require('cors');
const chalk = require('chalk');
const express = require('express');
const PORT = process.env.PORT || 3000;
const apirouter = require('./routes/api.js');
const mainrouter = require('./routes/main.js');

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
app.use('/', mainrouter);
app.use('/api', apirouter);

app.listen(PORT, () => {
  console.log(chalk.green(`Server running on port ${PORT}`));
});

module.exports = app;