'use strict'
const multer = require('multer')
const invalidAvatarFileError = require('./config').errors.invalidAvatarFile

const multerConfig = {
  destinationFolder: 'uploads/',
  fieldName: 'avatar',
  contentTypeHeader: 'Content-Type',
  fileExtensionRegex: /\.(jpg|jpeg|png|gif)$/
}

exports.upload = multer({
  dest: multerConfig.destinationFolder,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(multerConfig.fileExtensionRegex)) {
      return cb(invalidAvatarFileError)
    }
    cb(null, true)
  }
})
  .single(multerConfig.fieldName)

exports.config = multerConfig
