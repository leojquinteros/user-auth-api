'use strict'
const emailValidator = require('validator').isEmail
const lengthValidator = require('validator').isLength

const validator = {
  isValidEmail: (req) => {
    return req && emailValidator(req)
  },
  isValidPassword: (req) => {
    return req && req.trim().length && lengthValidator(req, 5, 12)
  }
}

module.exports = validator
