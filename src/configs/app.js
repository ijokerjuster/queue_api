require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3001,
    mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/queue',
    secret: 'queuesecret'
}