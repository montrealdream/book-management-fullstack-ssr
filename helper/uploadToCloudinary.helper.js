/**
 * @description Cloudinary Helper
 * @author GIANG TRƯỜNG
*/
require('dotenv').config(); // hỗ trợ process env

const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

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





