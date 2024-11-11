/**
 * @description Cấu hình database 
 * @author GIANG TRƯỜNG
 */

require('dotenv').config();

// môi trường DEV
const dev = {
    env: 'dev',
    app: {
        port: process.env.DEV_APP_PORT || 3055
    },
    db: {
        host: process.env.DEV_DB_HOST,
        port: process.env.DEV_DB_PORT,
        name: process.env.DEV_DB_NAME
    }
}

// môi trường Product
const pro = {
    env: 'pro',
    app: {
        port: process.env.PRODUCT_APP_PORT || 3055
    },
    db: {
        host: process.env.PRODUCT_DB_HOST,
        port: process.env.PRODUCT_DB_PORT,
        name: process.env.PRODUCT_DB_NAME
    }
}

// lựa chọn môi trường
const env = process.env.NODE_ENV || 'dev';

const config = {
    dev,
    pro
};

console.log(config[env]);
console.log(`Môi trường: ${env}`);

module.exports = config[env];