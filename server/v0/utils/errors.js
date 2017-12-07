'use strict';
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
    invalidPassword: {
        status: 401,
        message: 'Invalid password.'
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
};

errors.commonErrorResponse = (res, error) => {
    const status = error !== null && error.status ? error.status : 500;
    return res.status(status).json({
        successful: false, 
        error: error.message
    });
};

errors.commonSuccessResponse = (res, data, prevStatus) => {
    const status = prevStatus ? prevStatus : 200;
    return res.status(status).json(data);
};

module.exports = errors;