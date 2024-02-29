const express = require('express');
const app = express();
const env = require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

module.exports = app;
