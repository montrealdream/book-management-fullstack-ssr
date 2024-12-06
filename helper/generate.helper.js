/**
 * @description Generate Helper
 * @author GIANG TRƯỜNG
*/

const crypto = require('crypto');

/**
 * @description Hàm tạo chuỗi random
 * @param {*} length: độ dài chuỗi random muốn tạo ra
 * @returns 
 */
module.exports.randomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = ``;

    for(let index = 0 ; index < length ; index++) {
        result += characters.charAt(
                            Math.floor(
                                Math.random() * characters.length)
                            );
    }
    return result;
}

/**
 * @description Hàm tạo chuỗi random
 * @param {*} length: độ dài chuỗi random muốn tạo ra
 * @returns 
 */
module.exports.randomStringNum = (length) => {
    const characters = '0123456789';

    let result = ``;

    for(let index = 0 ; index < length ; index++) {
        result += characters.charAt(
                            Math.floor(
                                Math.random() * characters.length)
                            );
    }
    return result;
}

/**
 * 
 * @param {*} length 
 * @returns 
 */
module.exports.keyCrypto = (length) => {
    const token = crypto.randomBytes(length).toString('hex');
    return token;
}