'use strict';
const express = require('express');
const router = express.Router();
const config = require('../../utils/errors');
const auth = require('../../utils/jwt');
const User = require('../../models/user');


router.get('/me', auth.isAuthenticated, (req, res, next) => {
    User.publicData(req._user.id).then( (result) => {
        config.commonSuccessResponse(res, result);
    }).catch( (err)  => {
        config.commonErrorResponse(res, err);
    });
});

router.patch('/', auth.isAuthenticated, (req, res, next) => {
    Passenger.fillAccount(req._user.id, req.body).then( (result) => {
        config.commonSuccessResponse(res, result);
    }).catch( (err)  => {
        config.commonErrorResponse(res, err);
    });
});

module.exports = router;