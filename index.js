#!/usr/bin/env node

const cors = require('cors');
const chalk = require('chalk');
const express = require('express');
const PORT = process.env.PORT || 3000;
const apirouter = require('./routes/api.js');

const app = express();

app.enable('trust proxy');
app.set('json spaces', 2);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    next();
  } else {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
});

app.use(express.static('lib'));

app.get('/', (req, res) => {
    res.redirect('https://github.com/RidwanzAnphelibelll/SimpleRestApi#readme');
});

app.use('/api', apirouter);

app.listen(PORT, () => {
  console.log(chalk.green(`Server running on port ${PORT}`));
});

module.exports = app;