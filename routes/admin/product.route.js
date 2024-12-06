/**
 * @description Router Admin Products (Sản phẩm)
 * @author GIANG TRƯỜNG
*/

const express = require('express');
const controller = require("../../controllers/admin/product.controller");
const validate = require('../../validates/admin/product.validate');

// upload ảnh dưới local
// const multer  = require('multer');
// const diskStorage = require('../../helper/diskStorageMulter.helper');
// const upload = multer({ storage: diskStorage() }); 
// hết upload ảnh dưới local

// upload ảnh lên cloudinary
const multer  = require('multer');
const upload = multer();
const cloudinaryMiddleware = require('../../middleware/admin/uploadToCloudinary.middleware');
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
    // upload.single('thumbnail'), // upload một ảnh 
    upload.array("thumbnail", 3),  // upload nhiều ảnh
    cloudinaryMiddleware.uploadArray, // upload nhiều ảnh lên cloudinary,
    validate.create,
    controller.create
);

router.get(
    '/edit/:id',
    controller.editUI
);

router.patch(
    '/edit/:id',
    // upload.single('thumbnail'), // upload một ảnh 
    upload.array("thumbnail", 3),  // upload nhiều ảnh
    cloudinaryMiddleware.uploadArray, // upload nhiều ảnh lên cloudinary
    validate.create, // sử dụng lại vẫn ok nha
    controller.edit
);

router.get(
    '/detail/:id',
    controller.detail
);
// exports
module.exports = router;