/**
 * @description Router Admin Products (Sản phẩm)
 * @author GIANG TRƯỜNG
*/

const express = require('express');
const controller = require("../../controllers/admin/product.controller");

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
    controller.deleteSoft
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
    cloudinaryMiddleware.uploadArray, // upload nhiều ảnh lên cloudinary
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
    controller.edit
);

// exports
module.exports = router;