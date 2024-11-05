/**
 * @description Controller Admin Account (Tài khoản quản trị)
 * @author GIANG TRƯỜNG
*/

const Account = require('../../models/account.model');

const bcrypt = require('bcrypt');
const saltRounds = 10; // Số vòng lặp, càng cao càng an toàn

const filterHelper = require('../../helper/filter.helper');
const searchHelper = require('../../helper/search.helper');
const paginationHelper = require('../../helper/pagination.helper');
const generateHelper = require('../../helper/generate.helper');

// [GET] /admin/accounts/
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
            findObject.fullName = searchObject.keywordRegex;

        // đếm số lượng sản phẩm (theo các tiêu chí bên trên)
        const quantityRecords = await Account.countDocuments(findObject);
        
        // sắp xếp (chưa ok vì bên account là fullName chớ không phải title)
        const sortObject = {};
        let sortKey =   req.query.sortKey || 'position';
        let sortValue = req.query.sortValue || 'desc';
        sortObject[sortKey] = sortValue;

        // phân trang
        const paginationObject = paginationHelper.pagination(req.query, quantityRecords);

        // tìm kiếm database
        const records  = await Account.find(findObject)
                                        .limit(paginationObject.limit)
                                        .skip(paginationObject.skip)
                                        .sort(sortObject)
        
        res.render("admin/pages/accounts/index", {
            title: "Danh sách tài khoản",
            records,
            filterStatusArray, // khối giao diện bộ lọc trạng thái
            keyword: searchObject.keyword,
            paginationObject
        });
    }
    catch(error) {
        console.log("Danh sách tài khoản xảy ra lỗi");
    }

}

// [PATCH] /admin/accounts/change-status/:id/:status
module.exports.changeStatus = async (req, res) => {
    try{
        const {id, status} = req.params;
        
        const statusValid = ["active", "inactive"];

        if(statusValid.includes(status) === false) {
            req.flash('warning', 'Trạng thái gửi lên không hợp lệ');
            res.redirect('back');
        }

        // cập nhật trạng thái
        await Account.updateOne(
            {
                _id: id
            },
            {
                status: status
            }
        );
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

        // xóa mềm
        await Account.updateOne(
            {
                _id: id
            }, {
                deleted: true
            }
        );

        req.flash('success', 'Xóa tài khoản thành công');
        res.redirect('back');
    }
    catch(error) {

    }
}

// [GET] /admin/accounts/create
module.exports.createUI = async (req, res) => {
    try {
        res.render("admin/pages/accounts/create", {
            title: "Tạo tài khoản",
        });
    }
    catch(error) {

    }
}

// [POST] /admin/accounts/create
module.exports.create = async (req, res) => {
    try {   
        // upload một ảnh vào thư mục local
        // req.body[req.file.fieldname] = `/uploads/${req.file.filename}`;

        // upload nhiều ảnh vào thư mục local
        // req.body[req.files[0].fieldname] = req.files.map(item => `/uploads/${item.filename}`);

        // check xem email đã tồn tại chưa
        const emailExits = await Account.findOne({
            email: req.body.email
        });

        if(emailExits) {
            req.flash('warning', 'Email đã tồn tại');
            res.redirect('back');
            return;
        }

        // tạo token cho tài khoản, cộng thêm date.now() cho nó tạo ra unique an toàn
        req.body["token"] = generateHelper.randomString(30) + Date.now();

        // mã hóa password
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);

        // tạo bản ghi mới và lưu vào db
        const record  = new Account(req.body);
        await record.save();

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

        // tìm kiếm database, không lấy password vì nếu cập nhật mật khẩu mới thì sẽ tự gõ vào
        const record = await Account.findOne({_id: id})
                                    .select("-password");
        
        res.render("admin/pages/accounts/edit", {
            title: "Chỉnh sửa",
            record,
        })
        
    }
    catch(error) {

    }
}

// [PATCH] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        // check xem email đang cập nhật có bị trùng lặp không
        const isEmailExits = await Account.findOne({
            _id: {$ne: id}, // không xét theo tài khoản của chính mình
            email: req.body.email
        })

        // nếu email này đã được người dùng khác sử dụng thì không cập nhật
        if(isEmailExits) {
            req.flash('warning', 'Email đã tồn tại');
            res.redirect('back');
            return;
        }

        // nếu không cập nhật mật khẩu thì mật khẩu sẽ trống, vậy để tránh cập nhật sai thì chỉ cần xóa nó
        if(req.body.password === "")
            delete req.body['password'];
        
        // nếu trường password không trống thì mã hóa mật khẩu mới
        else {
            req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        }

        await Account.updateOne(
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