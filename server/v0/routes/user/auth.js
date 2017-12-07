'use strict';
const express = require('express');
const router = express.Router();
const authCtrl = require('../../controllers/auth');
const config = require('../../utils/errors');

router.post('/sign_up', (req, res) => {
    authCtrl.register(req.body).then( (result) => {
        config.commonSuccessResponse(res, result, 201);
    }).catch( (err)  => {
        config.commonErrorResponse(res, err);
    });
});

router.post('/sign_in', (req, res) => {
    authCtrl.login(req.body).then( (result) => {
        config.commonSuccessResponse(res, result);
    }).catch( (err)  => {
        config.commonErrorResponse(res, err);
    });
});

module.exports = router;