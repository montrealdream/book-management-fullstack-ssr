/**
 * @description Router Admin Products (Sản phẩm)
 * @author GIANG TRƯỜNG
 */

const express = require('express');
const controller = require("../../controllers/admin/product.controller");

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

// exports
module.exports = router;