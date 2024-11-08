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

router.get(
    '/edit/:id',
    controller.editUI
);

router.patch(
    '/edit/:id',
    validate.create,
    controller.edit
);

router.get(
    '/permission',
    controller.permissionUI
);

router.patch(
    '/permission',
    controller.permission
);
// exports
module.exports = router;