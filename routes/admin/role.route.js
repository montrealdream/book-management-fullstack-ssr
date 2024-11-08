/**
 * @description Router Admin Role (Nhóm quyền)
 * @author GIANG TRƯỜNG
*/

const express = require('express');
const controller = require("../../controllers/admin/role.controller");
const validate = require('../../validates/admin/role.validate');

// khởi tạo instance router
const router = express.Router();

// router
router.get(
    '/',
    controller.index
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
    validate.create,
    controller.create
);

// exports
module.exports = router;