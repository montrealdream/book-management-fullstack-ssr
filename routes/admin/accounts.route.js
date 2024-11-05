/**
 * @description Router Admin Product Category (Danh Mục Sản phẩm)
 * @author GIANG TRƯỜNG
*/

const express = require('express');
const controller = require("../../controllers/admin/account.controller");
const validate = require('../../validates/admin/account.validate');

// upload ảnh dưới local
// const multer  = require('multer');
// const diskStorage = require('../../helper/diskStorageMulter.helper');
// const upload = multer({ storage: diskStorage() }); 
// hết upload ảnh dưới local

// upload ảnh lên cloudinary
const multer  = require('multer');
const upload = multer();
const cloudinaryMiddleware = require('../../middleware/uploadToCloudinary.middleware');
// hết upload ảnh lên cloudinary

// khởi tạo instance router
const router = express.Router();

// router
router.get(
    '/',
    controller.index
);

router.patch(
    '/change-status/:id/:status',
    controller.changeStatus
);

router.patch(
    '/delete-soft/:id',
    controller.deleteSoft
);

router.get(
    '/create',
    controller.createUI
);

router.post(
    '/create',
    upload.single('avatar'), // upload một ảnh 
    cloudinaryMiddleware.uploadSingle, // upload một ảnh lên cloudinary,
    validate.create,
    controller.create
);
// exports
module.exports = router;