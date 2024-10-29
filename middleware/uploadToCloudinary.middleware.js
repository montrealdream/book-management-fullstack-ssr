/**
 * @description Cloudinary Middleware
 * @author GIANG TRƯỜNG
*/

const cloudinaryHelper = require('../helper/uploadToCloudinary.helper');

// upload một file (một ảnh, ... )
module.exports.uploadSingle = async (req, res, next) => {
    if(req.file) {
        let link = await cloudinaryHelper(req.file);

        // gán vào trưởng dữ liệu sẽ cập nhật vào database luôn, do đó bên controller không cần xử lý
        req.body[req.file.fieldname] = link; 
    }
    next(); // di chuyển đến middleware tiếp theo hoặc controller
}

// upload nhiều file (nhiều ảnh, ... )
module.exports.uploadArray = async (req, res, next) => {
    if(req.files) {
        let linkImage = [];

        for(file of req.files) {
            let link = await cloudinaryHelper(file.buffer);
            linkImage.push(link);
        }

        // gán vào trưởng dữ liệu sẽ cập nhật vào database luôn, do đó bên controller không cần xử lý
        req.body[req.files[0].fieldname] = linkImage;
    }
    next(); // di chuyển đến middleware tiếp theo hoặc controller
}