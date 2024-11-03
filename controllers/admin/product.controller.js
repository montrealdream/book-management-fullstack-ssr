/**
 * @description Controller Admin Products (Sản phẩm)
 * @author GIANG TRƯỜNG
*/

const Product = require('../../models/product.model');

const filterHelper = require('../../helper/filter.helper');
const searchHelper = require('../../helper/search.helper');
const paginationHelper = require('../../helper/pagination.helper');

// [GET] /admin/products/
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
        const quantityRecords = await Product.countDocuments(findObject);
        
        // sắp xếp
        const sortObject = {};
        let sortKey =   req.query.sortKey || 'position';
        let sortValue = req.query.sortValue || 'desc';
        sortObject[sortKey] = sortValue;

        // phân trang
        const paginationObject = paginationHelper.pagination(req.query, quantityRecords);

        // tìm kiếm database
        const records  = await Product.find(findObject)
                                        .limit(paginationObject.limit)
                                        .skip(paginationObject.skip)
                                        .sort(sortObject)
        
        res.render("admin/pages/products/index", {
            title: "Danh sách sản phẩm",
            records,
            filterStatusArray, // khối giao diện bộ lọc trạng thái
            keyword: searchObject.keyword,
            paginationObject
        });
    }
    catch(error) {
        console.log("Danh sách sản phẩm xảy ra lỗi");
    }

}

// [PATCH] /admin/products/change-status/:id/:status
module.exports.changeStatus = async (req, res) => {
    try{
        const {id, status} = req.params;
        
        const statusValid = ["active", "inactive"];

        if(statusValid.includes(status) === false) {
            req.flash('warning', 'Trạng thái gửi lên không hợp lệ');
            res.redirect('back');
        }

        // cập nhật trạng thái
        await Product.updateOne(
            {
                _id: id
            },
            {
                status: status
            }
        );
        req.flash('success', 'Thay đổi trạng thái sản phẩm thành công');
        res.redirect('back');
    }
    catch(error) {

    }
}

// [PATCH] /admin/products/delete-soft/:id
module.exports.deleteSoft = async (req, res) => {
    try {
        const id = req.params.id;

        // xóa mềm
        await Product.updateOne(
            {
                _id: id
            }, {
                deleted: true
            }
        );

        req.flash('success', 'Xóa sản phẩm thành công');
        res.redirect('back');
    }
    catch(error) {

    }
}

// [GET] /admin/products/create
module.exports.createUI = async (req, res) => {
    try {
        res.render("admin/pages/products/create", {
            title: "Tạo mới sản phẩm"
        });
    }
    catch(error) {

    }
}

// [POST] /admin/products/create
module.exports.create = async (req, res) => {
    try {
        
        // format lại một số trường về định dạng number
        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.stock = parseInt(req.body.stock);

        if(req.body.position === "") {
            req.body.position = await Product.countDocuments({
                status: "active",
                deleted: false,
            }) + 1;
        }

        else req.body.position = parseInt(req.body.position);
        
        // upload một ảnh vào thư mục local
        // req.body[req.file.fieldname] = `/uploads/${req.file.filename}`;

        // upload nhiều ảnh vào thư mục local
        // req.body[req.files[0].fieldname] = req.files.map(item => `/uploads/${item.filename}`);

        // tạo bản ghi mới và lưu vào db
        const record  = new Product(req.body);
        await record.save();
        req.flash('success', 'Tạo sản phẩm thành công');
        res.redirect('back');
    }
    catch(error) {

    }
}

// [GET] /admin/products/edit/:id
module.exports.editUI = async (req, res) => {
    try {
        const id = req.params.id;

        // tìm kiếm database
        const record = await Product.findOne({_id: id});
        
        res.render("admin/pages/products/edit", {
            title: "Chỉnh sửa",
            record
        })
        
    }
    catch(error) {

    }
}

// [PATCH] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        await Product.updateOne(
            {
                _id: id
            }, 
            req.body
        )
        req.flash('success', 'Tạo sản phẩm thành công');
        res.redirect('back');  
    }
    catch(error) {

    }
}