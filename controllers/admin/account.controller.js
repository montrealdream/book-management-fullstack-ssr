/**
 * @description Controller Admin Account (Tài khoản quản trị)
 * @author GIANG TRƯỜNG
*/

const AccountService = require('../../services/account.service');
const RoleService = require('../../services/role.service');

// [GET] /admin/accounts/
module.exports.index = async (req, res) => {
    try {  
        const metadata = await AccountService.findAll(req.query);

        const { 
            records, 
            filterStatusArray, 
            keyword, 
            paginationObject 
        } = metadata;

        res.render("admin/pages/accounts/index", {
            title: "Danh sách tài khoản",
            records,
            filterStatusArray, // khối giao diện bộ lọc trạng thái
            keyword,
            paginationObject
        });
    }
    catch(error) {
        console.log(error);
        console.log("Danh sách tài khoản xảy ra lỗi");
    }
}

// [PATCH] /admin/accounts/change-status/:id/:status
module.exports.changeStatus = async (req, res) => {
    try{
        
        const {id, status} = req.params;
        const { code, message, record } = await AccountService.changeStatus(id, status);

        if(code === 400) {
            req.flash('warning', message);
            res.redirect('back');
        }

        req.flash('success', 'Thay đổi trạng thái thành công');
        res.redirect('back');
    }
    catch(error) {

    }
}

// [PATCH] /admin/accounts/delete-soft/:id
module.exports.deleteSoft = async (req, res) => {
    try {
        const id = req.params.id;

        const {code, message, record} = await AccountService.deleteSoft(id);

        req.flash('success', 'Xóa tài khoản thành công');
        res.redirect('back');
    }
    catch(error) {

    }
}

// [GET] /admin/accounts/create
module.exports.createUI = async (req, res) => {
    try {
        const {records} = await RoleService.findAll(req.query);

        res.render("admin/pages/accounts/create", {
            title: "Tạo tài khoản",
            roles: records
        });
    }
    catch(error) {

    }
}

// [POST] /admin/accounts/create
module.exports.create = async (req, res) => {
    try {   
        const {code, message, record } = await AccountService.create(req.body);

        if(code === 400) {
            req.flash('warning', 'Email đã tồn tại');
            res.redirect('back');
            return;
        }

        req.flash('success', 'Tạo tài khoản thành công');
        res.redirect('back');
    }
    catch(error) {

    }
}

// [GET] /admin/accounts/edit/:id
module.exports.editUI = async (req, res) => {
    try {
        const id = req.params.id; // id của sản phẩm

        const {code, message, record} = await AccountService.findById(id);
        
        const {records} = await RoleService.findAll(req.query);

        res.render("admin/pages/accounts/edit", {
            title: "Chỉnh sửa",
            record,
            roles: records
        })
        
    }
    catch(error) {
        console.log('Chỉnh sửa tài khoản quản trị lỗi', error);
    }
}

// [PATCH] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        const { code, message, record } = await AccountService.edit(id, req.body);

        if(code === 400) {
            req.flash('warning', 'Email đã tồn tại');
            res.redirect('back');
            return;
        }

        req.flash('success', 'Chỉnh sửa thành công');
        res.redirect('back');  
    }
    catch(error) {

    }
}