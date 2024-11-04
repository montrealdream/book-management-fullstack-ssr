/**
 * @description Generate Helper
 * @author GIANG TRƯỜNG
*/

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