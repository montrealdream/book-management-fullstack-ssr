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
        
        // phân trang
        const paginationObject = paginationHelper.pagination(req.query, quantityRecords);

        // tìm kiếm database
        const records  = await Product.find(findObject)
                                        .limit(paginationObject.limit)
                                        .skip(paginationObject.skip)
        
        res.render("admin/pages/products", {
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