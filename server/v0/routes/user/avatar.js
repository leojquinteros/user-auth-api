'use strict'
const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const avatar = require('../../utils/multer')
const config = require('../../utils/config')
const auth = require('../../utils/jwt')
const User = require('../../models/user')

router.post('/avatar', auth.isAuthenticated, (req, res, next) => {
  avatar.upload(req, res, (err) => {
    if (err) {
      console.log(err)
      config.commonErrorResponse(res, err)
    } else {
      User.updateAvatar(req._user.id, req.file).then((result) => {
        config.commonSuccessResponse(res, {
          successful: true,
          data: {
            filename: req.file.filename,
            mimetype: req.file.mimetype
          }
        })
      }).catch((err) => {
        config.commonErrorResponse(res, err)
      })
    }
  })
})

router.get('/avatar', auth.isAuthenticated, (req, res, next) => {
  User.publicData(req._user.id).then((result) => {
    if (result.avatarType && result.avatarFileName) {
      var readStream = fs.createReadStream(path.join(avatar.config.destinationFolder, result.avatarFileName))
      readStream.on('open', () => {
        res.setHeader(avatar.config.contentTypeHeader, result.avatarType)
        readStream.pipe(res)
      })
      readStream.on('error', () => {
        config.commonErrorResponse(res, config.errors.internalError)
      })
    } else {
      config.commonErrorResponse(res, config.errors.avatarNotFound)
    }
  }).catch((err) => {
    config.commonErrorResponse(res, err)
  })
})

module.exports = router
