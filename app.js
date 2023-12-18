const express = require('express');

const campRouter = require('./routes/campRoute');

const app = express();

app.use(express.json());

app.use('/api/v1/camps', campRouter)

module.exports = app;