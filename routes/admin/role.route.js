/**
 * @description Router Admin Role (Nhóm quyền)
 * @author GIANG TRƯỜNG
*/

const express = require('express');
const controller = require("../../controllers/admin/role.controller");
const validate = require('../../validates/admin/product.validate');

// khởi tạo instance router
const router = express.Router();

// router
router.get(
    '/',
    controller.index
);

// exports
module.exports = router;