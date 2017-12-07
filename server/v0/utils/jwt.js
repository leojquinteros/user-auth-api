'use strict';
const jwt = require('jsonwebtoken');
const moment = require('moment');
const errors = require('./config').errors;

const authConfig = {
    prefix: 'Bearer',
    privateKey : 'user-auth-api@leojquinteros',
    durationType: "days",
    duration: 7
};

const createToken = (id) => {
    const payload = {
        iat: moment().unix(),
        exp: moment().add(authConfig.duration, authConfig.durationType).unix(),
        uid: id
    };

    return jwt.sign(payload, authConfig.privateKey);
};

const validateToken = (tokenParam) => {
    let response = {
        error: null,
        id: null
    };

    try {
        if(!tokenParam) {
            response.error = errors.credentialsMissing;
            return response;
        }

        const token = tokenParam.substr(0, authConfig.prefix.length) === authConfig.prefix ? tokenParam.split(" ")[1] : tokenParam;
        const payload = jwt.verify(token, authConfig.privateKey);

        if(payload.exp <= moment().unix()) {
            response.error = errors.expiredToken;
            return response;
        }

        if (payload.uid) response.uid = payload.uid;

        return response;

    } catch(err) {
        response.error = errors.invalidToken;
        return response;
    }
};

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization;
    const response = validateToken(token);

    if (response.error != null){
        return errors.commonErrorResponse(res, response.error);
    }

    if (response.uid != null){
        req._user = {
            id: response.uid
        };
    }

    next();
};

exports.createToken = createToken;
exports.isAuthenticated = isAuthenticated;
