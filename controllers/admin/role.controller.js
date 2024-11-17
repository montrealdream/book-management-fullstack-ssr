/**
 * @description Controller Admin Role (Nhóm quyền)
 * @author GIANG TRƯỜNG
*/

const Role = require('../../models/role.model');

const filterHelper = require('../../helper/filter.helper');
const searchHelper = require('../../helper/search.helper');
const paginationHelper = require('../../helper/pagination.helper');

const RoleService = require('../../services/role.service');

// [GET] /admin/roles/
module.exports.index = async (req, res) => {
    try {  
        
        const metadata = await RoleService.getListRole(req.query);

        const { records, filterStatusArray, keyword, paginationObject } = metadata;

        res.render("admin/pages/roles/index", {
            title: "Danh sách nhóm quyền",
            records,
            filterStatusArray, // khối giao diện bộ lọc trạng thái
            keyword: keyword,
            paginationObject
        });
    }
    catch(error) {
        console.log("Danh nhóm quyền khoản xảy ra lỗi");
        console.log(error);
    }
}

// [PATCH] /admin/products-category/delete-soft/:id
module.exports.deleteSoft = async (req, res) => {
    try {
        const id = req.params.id;

        await RoleService.deleteSoft(id);

        req.flash('success', 'Xóa nhóm quyền thành công');
        res.redirect('back');
    }
    catch(error) {

    }
}

// [GET] /admin/roles/create
module.exports.createUI = async (req, res) => {
    try {
        res.render("admin/pages/roles/create", {
            title: "Tạo nhóm quyền",
        });
    }
    catch(error) {

    }
}

// [POST] /admin/roles/create
module.exports.create = async (req, res) => {
    try {   
        await RoleService.create(req.body);

        req.flash('success', 'Tạo danh mục thành công');
        res.redirect('back');
    }
    catch(error) {

    }
}

// [GET] /admin/roles/edit/:id
module.exports.editUI = async (req, res) => {
    try {
        const id = req.params.id; // id của nhóm quyền muốn chỉnh sửa

        await RoleService.getRoleById(id);

        res.render("admin/pages/roles/edit", {
            title: "Chỉnh sửa quyền",
            record
        });
    }
    catch(error) {

    }
}

// [PATCH] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        await RoleService.edit(id, req.body);
        req.flash('success', 'Chỉnh sửa thành công');
        res.redirect('back');  
    }
    catch(error) {

    }
}

// [GET] /admin/roles/permission
module.exports.permissionUI = async (req, res) => {
    try {

        const roles = await RoleService.permissionUI();

        res.render("admin/pages/roles/permissions", {
            title: "Phân quyền",
            roles
        });
    }
    catch(error) {

    }
}

// [PATCH] /admin/roles/permission
module.exports.permission = async (req, res) => {
    try {
        
        const permission = JSON.parse(req.body.perrmision);

        await RoleService.permission(permission);
        
        req.flash('success', 'Phân quyền thành công');

        res.redirect('back');

    }
    catch(error) {
        console.log('Lỗi phân quyền', error);
    }
}