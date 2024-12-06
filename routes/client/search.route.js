/**
 * @description Router Client Search (Trang Kết Quả Tìm Kiếm)
 * @author GIANG TRƯỜNG
*/

const express = require('express');

// khởi tạo instance router
const router = express.Router();

// controller
const controller = require('../../controllers/client/search.controller');

// router
router.get(
    '/',
    controller.index
);


router.get(
    '/suggest',
    controller.suggest
);
// exports
module.exports = router;