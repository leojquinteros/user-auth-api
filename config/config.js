module.exports = {
  general: {
    port: 3000
  },
  database: {
    mongodbEndpoint: process.env.MONGODB_ENDPOINT | 'mongodb://127.0.0.1:27017/user-auth-api'
  }
}
