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

router.get(
    '/login',
    controller.loginUI
);

router.post(
    '/login',
    controller.login
);

router.get(
    '/password/forgot',
    controller.forgotPasswordUI
);

router.post(
    '/password/forgot',
    controller.forgotPassword
);

router.get(
    '/password/otp',
    controller.otpUI
);

router.post(
    '/password/otp',
    controller.otp
);

router.get(
    '/password/reset',
    controller.resetPasswordUI
);

router.post(
    '/password/reset',
    controller.resetPassword
);
// exports
module.exports = router;