'use strict';
const mongoose = require('mongoose');
const jwtoken = require('../utils/jwt');
const User = require('../models/user');
const errors = require('../utils/config').errors;
const validator = require('../validators/user');

const register = (body) => {
    return new Promise((resolve, reject) => {
        if (!body.email || !body.password) {
            return reject(errors.missingInput);
        }
        if(!validator.isValidEmail(body.email)) {
            return reject(errors.invalidEmail);
        }
        if(!validator.isValidPassword(body.password)) {
            return reject(errors.invalidPassword);
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
            return reject(errors.missingInput);
        }
        if(!validator.isValidEmail(body.email)) {
            return reject(errors.invalidEmail);
        }
        if(!validator.isValidPassword(body.password)) {
            return reject(errors.invalidPassword);
        }
        let user = null;
        User.findByCredentials(body.email, body.password).then((data) => {
            user = data;
            return User.publicData(user._id);
        }).then((data) => {
            resolve({
                token: jwtoken.createToken(user._id),
                data: data
            });
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}

exports.login = login;
exports.register = register;