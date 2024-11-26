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
const AccountService = require('../../services/account.service');

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    try {
        const metadata = await ProductCategoryService.findAll(req.query);

        const { 
            records, 
            filterStatusArray, 
            keyword, 
            paginationObject 
        } = metadata;

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
        const { code, message, record } = await ProductCategoryService.changeStatus(id, status, res.locals.account._id);

        req.flash('success', 'Thay đổi trạng thái danh mục thành công');
        res.redirect('back');
    }
    catch(error) {
        console.log('Thay đổi trạng thái danh mục lỗi', error);
    }
}

// [PATCH] /admin/products-category/delete-soft/:id
module.exports.deleteSoft = async (req, res) => {
    try {
        const id = req.params.id;

        // xóa mềm
        const { record }  = await ProductCategoryService.deleteSoft(id, res.locals.account._id);

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
        const {code, message, record } = await ProductCategoryService.create(req.body, res.locals.account._id);

        req.flash('success', message);
        res.redirect('back');
    }
    catch(error) {
        console.log('Lỗi táo sản phẩm', error);
    }
}

// [GET] /admin/products-category/edit/:id
module.exports.editUI = async (req, res) => {
    try {
        const id = req.params.id; // id của danh mục muốn chỉnh sửa

        // tạo cây danh mục
        const listProductsCategoryTree = await ProductCategoryService.treeProductCategory();

        const {code, message, record} = await ProductCategoryService.findById(id);

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
        
        const {code, message, record } = await ProductCategoryService.edit(id, req.body);

        req.flash('success', 'Chỉnh sửa thành công');
        res.redirect('back');  
    }
    catch(error) {

    }
}

// [GET] /admin/products-category/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const { record } = await ProductCategoryService.findById(req.params.id);

        // danh sách hành động trong sản phẩm này
        let by = [];

        // nếu sản phẩm này có người tạo thì sẽ lấy thông tin người tạo sản phẩm
        if(record.createdBy.userId !== undefined) {
            const account = await AccountService.findById(record.createdBy.userId);
            by.push({fullName: account.record.fullName, date: record.createdBy.createAt, action: 'Tạo danh mục'})
        }

        // nếu sản phẩm này có người xóa thì sẽ lấy thông tin người xóa sản phẩm
        if(record.deletedBy.userId !== undefined) {
            const account = await AccountService.findById(record.deletedBy.userId);
            by.push({fullName: account.record.fullName, date: record.deletedBy.deleteAt, action: 'Xóa danh mục'})
        }

        // lấy ra danh sách những người đã chỉnh sửa sản phẩm này 
        if(record.updatedBy != []) {
            const array = await Promise.all(record.updatedBy.map(async item => {

                const account = await AccountService.findById(item.userId);

                return {fullName: account.record.fullName, date: item.updateAt, action: item.action}

            }));
            
            by = by.concat(array);
        }

        by = by.reverse(); // hiển thị các cập nhật mới nhất lên trên

        res.render("admin/pages/products-category/detail", {
            title: "Chỉnh sửa",
            record,
            by
        })
    }
    catch(error) {

    }
}