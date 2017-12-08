'use strict';
const mongoose = require('mongoose');
const jwtoken = require('../utils/jwt');
const User = require('../models/user');
const missingInputError = require('../utils/config').errors.missingInput;

const register = (body) => {
    return new Promise((resolve, reject) => {
        if (!body.email || !body.password) {
            return reject(missingInputError);
        }
        User.signUp(body.email, body.password).then((user) => {
            resolve({
                token: jwtoken.createToken(user._id),
                data: user
            });
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}

const login = (body) => {
    return new Promise((resolve, reject) => {
        if (!body.email || !body.password) {
            return reject(missingInputError);
        }
        User.findByCredentials(body.email, body.password).then((user) => {
            resolve({
                token: jwtoken.createToken(user._id),
                data: user
            });
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}

exports.login = login;
exports.register = register;