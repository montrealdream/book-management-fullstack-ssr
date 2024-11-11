/**
 * @description Controller Admin Products (Sản phẩm)
 * @author GIANG TRƯỜNG
*/

const Product = require('../../models/product.model');
const ProductCategory = require('../../models/product-category.model');

const filterHelper = require('../../helper/filter.helper');
const searchHelper = require('../../helper/search.helper');
const paginationHelper = require('../../helper/pagination.helper');
const createTreeHelper = require('../../helper/createTree.helper');

const ProductService = require('../../services/product.service');

// [GET] /admin/products/
module.exports.index = async (req, res) => {
    try {  
        
        const metadata = await ProductService.getListProduct(req.body, req.query);

        const { records, filterStatusArray, keyword, paginationObject } = metadata;

        res.render("admin/pages/products/index", {
            title: "Danh sách sản phẩm",
            records,
            filterStatusArray, // khối giao diện bộ lọc trạng thái
            keyword,
            paginationObject
        });
    }
    catch(error) {
        console.log(error);
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
        // lấy ra danh sách danh mục
        const listProductsCategory = await ProductCategory.find({deleted: false})

        // tạo cây danh mục
        const listProductsCategoryTree = createTreeHelper(listProductsCategory);

        res.render("admin/pages/products/create", {
            title: "Tạo mới sản phẩm",
            listProductsCategoryTree
        });
    }
    catch(error) {

    }
}

// [POST] /admin/products/create
module.exports.create = async (req, res) => {
    try {
        const record = await ProductService.createProduct(req.body);
        req.flash('success', 'Tạo sản phẩm thành công');
        res.redirect('back');
    }
    catch(error) {

    }
}

// [GET] /admin/products/edit/:id
module.exports.editUI = async (req, res) => {
    try {
        const id = req.params.id; // id của sản phẩm

        // lấy ra danh sách danh mục
        const listProductsCategory = await ProductCategory.find({deleted: false})

        // tạo cây danh mục
        const listProductsCategoryTree = createTreeHelper(listProductsCategory);

        // tìm kiếm database
        const record = await Product.findOne({_id: id});
        
        res.render("admin/pages/products/edit", {
            title: "Chỉnh sửa",
            record,
            listProductsCategoryTree
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