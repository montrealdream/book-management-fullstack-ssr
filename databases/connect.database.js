/**
 * @description Kết nối database 
 * @author GIANG TRƯỜNG
*/

const mongoose = require('mongoose');
const {env, db: {host, port, name}} = require('../config/mongoose.config');

const MONGO_URL = `mongodb://${host}:${port}/${name}`;

// in ra mongoose logs trong môi trường dev
if(env === 'dev') {
    mongoose.set('debug', true);
}

module.exports.connect = () => {
    mongoose.connect(MONGO_URL)
        .then(_ => console.log('MongoDb: kết nối thành công !'))
        .catch(error => console.log('MongoDb: kết nối thất bại !'))
}