/**
 * @description Router Admin Dashboard
 * @author GIANG TRƯỜNG
 */

const express = require('express');
const controller = require("../../controllers/admin/dashboard.controller");

// khởi tạo instance router
const router = express.Router();

// router
router.get(
    '/',
    controller.dashboard
);

// exports
module.exports = router;