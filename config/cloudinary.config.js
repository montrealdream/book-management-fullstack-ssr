/**
 * @description Cấu hình Cloudinary
 * @author GIANG TRƯỜNG
*/

const cloudinary = require('cloudinary').v2;

module.exports = () => {
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
}