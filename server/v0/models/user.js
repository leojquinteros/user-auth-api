'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.Types.ObjectId;
const passwd = require('../utils/bcrypt');
const errors = require('../utils/config').errors;

const UserSchema = Schema({
    name: String,
    surname: String,
    email: { 
        type: String, 
        required: true,
        unique: true,
        sparse: false
    },
    password: { 
        type: String, 
        required: true 
    },
    phone: String,
    address: String,
    avatarFileName: String,
    avatarType: String,
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
},{
    collection: 'users'
});

UserSchema.statics = {
    
    signUp: (email, password) => {
        return new Promise((resolve, reject) => {
            User.findOne({ 
                email: email 
            }).then((previous) => {
                if (previous) return reject(errors.emailInUse);     
                const user = new User({
                    email: email,
                    password: passwd.hashPassword(password)
                });
                user.save().then((user) => {
                    resolve({
                        email: user.email,
                        _id: user._id
                    });
                }).catch((err) => {
                    console.log(err);
                    reject(err);
                });
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    },

    publicData: (id) => {
        return new Promise((resolve, reject) => {
            if (ObjectID.isValid(id)) {
                User.aggregate([
                    {
                        $match: {
                            '_id': ObjectID(id),
                        }
                    },
                    {
                        $project: {
                            "_id": 0,
                            "name": "$name",
                            "surname": "$surname",
                            "email": "$email",
                            "phone": "$phone",
                            "address": "$address",
                            "avatarFileName": "$avatarFileName",
                            "avatarType": "$avatarType",
                            "createdAt": { 
                                $subtract: [ "$createdAt", new Date("1970-01-01") ] 
                            }
                        }
                    }
                ]).then((user) => {
                    if(!user || user.length == 0) {
                        reject(errors.userNotFound);
                    } else {
                        resolve(user[0]);
                    }
                }).catch((err) => {
                    console.log(err);
                    reject(err);
                });
            } else {
                reject(errors.invalidObjectID);
            }
        });
    },

    resetPassword: (id, body) => {
        return new Promise((resolve, reject) => {
            if (ObjectID.isValid(id)) {
                User.findById(id).then((user) => {
                    if (!user) {
                        reject(errors.userNotFound);
                    }
                    if (!passwd.checkPassword(body.password, user.password)) {
                        reject(errors.incorrectPassword);
                    }
                    user.password = passwd.hashPassword(body.newPassword);
                    user.save().then((user) => {
                        resolve({
                            successful: true,
                            _id: user._id
                        });
                    }).catch((err) => {
                        console.log(err);
                        reject(err);
                    });
                }).catch((err) =>{
                    console.log(err);
                    reject(err);
                });
            } else {
                reject(errors.invalidObjectID);
            }
        })
    },

    findByCredentials: (email, password) => {
        return new Promise((resolve, reject) => {
            User.findOne({
                email: email
            })
            .then((user) => {
                if (!user) {
                    reject(errors.userNotFound);
                }
                if (!passwd.checkPassword(password, user.password)) {
                    reject(errors.incorrectPassword);
                }
                resolve(user);
            }).catch((err) =>{
                console.log(err);
                reject(err);
            });
        });
    },

    fillAccount: (id, body) => {
        return new Promise((resolve, reject) => {
            if (ObjectID.isValid(id)) {
                User.findByIdAndUpdate(id, { 
                    $set: {
                        name: body.name,
                        surname: body.surname,
                        phone: body.phone,
                        address: body.address
                    }
                }).then((user) => {
                    if (!user) {
                        reject(errors.userNotFound);
                    }
                    resolve({
                        successful: true,
                        _id: user._id
                    });
                }).catch((err) => {
                    console.log(err);
                    reject(err);
                });
            } else {
                reject(errors.invalidObjectID);
            }
        });
    },

    updateAvatar: (id, file) => {
        return new Promise((resolve, reject) => {
            if (ObjectID.isValid(id)) {
                User.findByIdAndUpdate(id, { 
                    $set: {
                        avatarFileName: file.filename,
                        avatarType: file.mimetype
                    }
                }).then((user) => {
                    if (!user) {
                        reject(errors.userNotFound);
                    }
                    resolve({
                        successful: true,
                        _id: user._id
                    });
                }).catch((err) => {
                    console.log(err);
                    reject(err);
                });
            } else {
                reject(errors.invalidObjectID);
            }
        });
    }

};

const User = module.exports = mongoose.model('user', UserSchema);
