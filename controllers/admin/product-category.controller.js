/**
 * @description Controller Admin Product Category (Danh Mục Sản phẩm)
 * @author GIANG TRƯỜNG
*/

const ProductCategory = require('../../models/product-category.model');

const filterHelper = require('../../helper/filter.helper');
const searchHelper = require('../../helper/search.helper');
const paginationHelper = require('../../helper/pagination.helper');
const createTreeHelper = require('../../helper/createTree.helper');

const ProductCategoryService = require('../../services/product-category.service');

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    try {
        const metadata = await ProductCategoryService.getListProductCategory(req.query);

        const { records, filterStatusArray, keyword, paginationObject } = metadata;

        res.render("admin/pages/products-category/index", {
            title: "Danh mục sản phẩm",
            records,
            filterStatusArray, // khối giao diện bộ lọc trạng thái
            keyword,
            paginationObject
        });
    }
    catch(error) {
        console.log(error);
    }
}

// [PATCH] /admin/products-category/change-status/:id/:status
module.exports.changeStatus = async (req, res) => {
    try{
        const {id, status} = req.params;
        await ProductCategoryService.changeStatus(id, status);


        req.flash('success', 'Thay đổi trạng thái danh mục thành công');
        res.redirect('back');
    }
    catch(error) {

    }
}

// [PATCH] /admin/products-category/delete-soft/:id
module.exports.deleteSoft = async (req, res) => {
    try {
        const id = req.params.id;

        // xóa mềm
        await ProductCategoryService.deleteSoft(id);

        req.flash('success', 'Xóa danh mục thành công');
        res.redirect('back');
    }
    catch(error) {

    }
}

// [GET] /admin/products-category/create
module.exports.createUI = async (req, res) => {
    try {
        const listProductsCategoryTree = await ProductCategoryService.treeProductCategory();

        res.render("admin/pages/products-category/create", {
            title: "Tạo mới danh mục",
            listProductsCategoryTree
        });
    }
    catch(error) {

    }
}

// [POST] /admin/products-category/create
module.exports.create = async (req, res) => {
    try {   
        await ProductCategoryService.create(req.body);
        req.flash('success', 'Tạo danh mục thành công');
        res.redirect('back');
    }
    catch(error) {

    }
}

// [GET] /admin/products-category/edit/:id
module.exports.editUI = async (req, res) => {
    try {
        const id = req.params.id; // id của danh mục muốn chỉnh sửa

        // tạo cây danh mục
        const listProductsCategoryTree = await ProductCategoryService.treeProductCategory();

        const record = await ProductCategoryService.findCategoryById(id);

        res.render("admin/pages/products-category/edit", {
            title: "Chỉnh sửa",
            record,
            listProductsCategoryTree
        })
        
    }
    catch(error) {

    }
}

// [PATCH] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        
        await ProductCategoryService.edit(id, req.body);

        req.flash('success', 'Chỉnh sửa thành công');
        res.redirect('back');  
    }
    catch(error) {

    }
}