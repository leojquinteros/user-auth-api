'use strict';
const express = require('express');
const app = express();
const api = require('../v0/routes/index');

//API v0 routes
app.use('/api/v0', api);

app.use((req, res, next) => {
    res.status(404).json({
        message:'Resource not found: ' + req.url 
    });
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    });
});

module.exports = app;