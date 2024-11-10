/**
 * @description Router Admin Authen
 * @author GIANG TRƯỜNG
*/

const express = require('express');
const controller = require("../../controllers/admin/auth.controller");
const validate = require('../../validates/admin/auth.validate');

// khởi tạo instance router
const router = express.Router();

// router
router.get(
    '/login',
    controller.loginUI
);

router.post(
    '/login',
    validate.login,
    controller.login
);

router.get(
    '/logout',
    controller.logout
);

// exports
module.exports = router;