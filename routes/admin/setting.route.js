/**
 * @description Router Setting General (Cài đặt chung)
 * @author GIANG TRƯỜNG
*/

const express = require('express');
const controller = require("../../controllers/admin/setting.controller");
const validate = require('../../validates/admin/role.validate');

// upload ảnh lên cloudinary
const multer  = require('multer');
const upload = multer();
const cloudinaryMiddleware = require('../../middleware/uploadToCloudinary.middleware');

// khởi tạo instance router
const router = express.Router();

// router
router.get(
    '/general',
    controller.generalUI
);

router.patch(
    '/general',
    upload.single('logo'), // upload một ảnh 
    cloudinaryMiddleware.uploadSingle, // upload một ảnh lên cloudinary
    controller.general
);

// exports
module.exports = router;