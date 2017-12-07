'use strict';
const bcrypt = require('bcrypt');

const passwd = {
    hashPassword: (req) => {
        return bcrypt.hashSync(req, 10);
    },
    checkPassword: (req, encoded) => {
        return bcrypt.compareSync(req, encoded);
    }
};

module.exports = passwd;
