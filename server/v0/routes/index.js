'use strict';
const express = require('express');
const app = express();

//Auth routes 
app.use('/auth', require('./user/auth'));

//User routes 
app.use('/users', require('./user/user'), require('./user/avatar'));

app.use((req, res, next) => {
    res.status(404).json({
        message:'Resource not found: ' + req.url 
    });
});

module.exports = app;