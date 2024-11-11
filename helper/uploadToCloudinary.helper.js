/**
 * @description Cloudinary Helper
 * @author GIANG TRƯỜNG
*/
require('dotenv').config(); // hỗ trợ process env
const cloudinaryConfig =  require('../config/cloudinary.config');

const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// cấu hình cloudinary
cloudinaryConfig();

let streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
            if(result) 
                resolve(result);
            else
                reject(error);
        });
        streamifier.createReadStream(buffer).pipe(stream);
    });
};

module.exports = async (buffer) => {
    let link  = (await streamUpload(buffer)).url;
    return link; // trả về link ảnh
}





