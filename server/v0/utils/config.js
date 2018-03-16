'use strict'
const errors = {
  invalidObjectID: {
    status: 422,
    message: 'Invalid Object ID'
  },
  missingInput: {
    status: 400,
    message: 'Missing data'
  },
  internalError: {
    status: 500,
    message: 'Internal error.'
  },
  emailInUse: {
    status: 422,
    message: 'Email already in use.'
  },
  userNotFound: {
    status: 404,
    message: 'User not found.'
  },
  avatarNotFound: {
    status: 404,
    message: 'Avatar not found.'
  },
  invalidAvatarFile: {
    status: 400,
    message: 'Only image files are allowed.'
  },
  incorrectPassword: {
    status: 401,
    message: 'Incorrect password.'
  },
  invalidEmail: {
    status: 422,
    message: 'Invalid email.'
  },
  invalidPassword: {
    status: 422,
    message: 'Invalid password. It must be between 5 and 12 characters.'
  },
  credentialsMissing: {
    status: 401,
    message: 'Authentication credentials missing.'
  },
  decodingToken: {
    status: 401,
    message: 'Decoding token error.'
  },
  invalidToken: {
    status: 401,
    message: 'Invalid token error.'
  },
  expiredToken: {
    status: 401,
    message: 'Expired token.'
  }
}

const commonErrorResponse = (res, error) => {
  const status = error && error.status ? error.status : 500
  return res.status(status).json({
    successful: false,
    error: error.message
  })
}

const commonSuccessResponse = (res, data, prevStatus) => {
  const status = prevStatus || 200
  return res.status(status).json(data)
}

exports.errors = errors
exports.commonSuccessResponse = commonSuccessResponse
exports.commonErrorResponse = commonErrorResponse
