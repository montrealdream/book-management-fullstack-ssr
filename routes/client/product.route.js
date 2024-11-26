/**
 * @description Router Client Home (Trang chủ)
 * @author GIANG TRƯỜNG
*/

const express = require('express');

// khởi tạo instance router
const router = express.Router();

// controller
const controller = require('../../controllers/client/product.controller');

// router
router.get(
    '/',
    controller.index
);

// exports
module.exports = router;