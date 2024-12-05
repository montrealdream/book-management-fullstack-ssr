/**
 * @description Router Client Home (Trang chủ)
 * @author GIANG TRƯỜNG
*/

const express = require('express');

// khởi tạo instance router
const router = express.Router();

// controller
const controller = require('../../controllers/client/user.controller');

// router
router.get(
    '/signup',
    controller.signupUI
);

router.post(
    '/signup',
    controller.signup
);
// exports
module.exports = router;