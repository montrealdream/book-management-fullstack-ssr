/**
 * @description Controller Admin Role (Nhóm quyền)
 * @author GIANG TRƯỜNG
*/

const Role = require('../../models/role.model');

const filterHelper = require('../../helper/filter.helper');
const searchHelper = require('../../helper/search.helper');
const paginationHelper = require('../../helper/pagination.helper');

// [GET] /admin/roles/
module.exports.index = async (req, res) => {
    try {  
        // mặc định sẽ lấy ra những sản phẩm chưa bị xóa
        const findObject = {
            deleted: false
        }

        // bộ lọc trạng thái
        if(req.query.status) findObject.status = req.query.status;
        const filterStatusArray = filterHelper.filterStatus(req.query);

        // tính năng tìm kiếm theo keyword
        let keyword = "";
        const searchObject = searchHelper.searchKeyword(req.query);
        if(searchObject.keywordRegex !== "")
            findObject.title = searchObject.keywordRegex;

        // đếm số lượng sản phẩm (theo các tiêu chí bên trên)
        const quantityRecords = await Role.countDocuments(findObject);
        
        // sắp xếp
        const sortObject = {};
        let sortKey =   req.query.sortKey || 'position';
        let sortValue = req.query.sortValue || 'desc';
        sortObject[sortKey] = sortValue;

        // phân trang
        const paginationObject = paginationHelper.pagination(req.query, quantityRecords);

        // tìm kiếm database
        const records  = await Role.find(findObject)
                                        .limit(paginationObject.limit)
                                        .skip(paginationObject.skip)
                                        .sort(sortObject)
        
        res.render("admin/pages/roles/index", {
            title: "Danh sách nhóm quyền",
            records,
            filterStatusArray, // khối giao diện bộ lọc trạng thái
            keyword: searchObject.keyword,
            paginationObject
        });
    }
    catch(error) {
        console.log("Danh nhóm quyền khoản xảy ra lỗi");
    }
}

// [PATCH] /admin/products-category/delete-soft/:id
module.exports.deleteSoft = async (req, res) => {
    try {
        const id = req.params.id;

        // xóa mềm
        await Role.updateOne(
            {
                _id: id
            }, {
                deleted: true
            }
        );

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

        // tạo bản ghi mới và lưu vào db
        const record  = new Role(req.body);
        await record.save();

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

        // tìm kiếm database
        const record = await Role.findOne({_id: id});

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

        await Role.updateOne(
            {
                _id: id
            }, 
            req.body
        )
        req.flash('success', 'Chỉnh sửa thành công');
        res.redirect('back');  
    }
    catch(error) {

    }
}

// [GET] /admin/roles/permission
module.exports.permissionUI = async (req, res) => {
    try {

        const roles = await Role.find({deleted: false})
                                    .select("-description")

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

        permission.forEach( async item => {
            const {id, permissions} = item;
            
            await Role.updateOne({
                _id: id
            }, {
                permissions: permissions
            });
        });
        
        req.flash('success', 'Phân quyền thành công');

        res.redirect('back');

    }
    catch(error) {

    }
}