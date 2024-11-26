/**
 * @description Controller Admin Products (Sản phẩm)
 * @author GIANG TRƯỜNG
*/

// Service
const ProductService = require('../../services/product.service');
const ProductCategoryService = require('../../services/product-category.service');
const AccountService = require('../../services/account.service');
const { fullName } = require('../../helper/accountValidate.helper');

// Helper
const formatCashHelper = require('../../helper/formatCash.helper');
const discountHelper = require('../../helper/discount.helper');

// [GET] /admin/products/
module.exports.index = async (req, res) => { 
    try {  
        const metadata = await ProductService.findAll(req.query);

        const { 
            records, 
            filterStatusArray, 
            keyword, 
            paginationObject 
        } = metadata;

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
        const { code, message } = await ProductService.changeStatus(id, status, res.locals.account._id);

        if(code === 400) {
            req.flash('warning', message);
            res.redirect('back');
            return;
        }

        req.flash('success', 'Thay đổi trạng thái sản phẩm thành công');
        res.redirect('back');
    }
    catch(error) {
        console.log('Thay đổi trạng thái sản phẩm', error);
    }
}

// [PATCH] /admin/products/delete-soft/:id
module.exports.deleteSoft = async (req, res) => {
    try {
        const id = req.params.id;
        const { code, message } = await ProductService.deleteSoft(id, res.locals.account._id);

        req.flash('success', 'Xóa sản phẩm thành công');
        res.redirect('back');
    }
    catch(error) {
        console.log('Lỗi xóa sản phẩm', error);
    }
}

// [GET] /admin/products/create
module.exports.createUI = async (req, res) => {
    try {
        res.render("admin/pages/products/create", {
            title: "Tạo mới sản phẩm",
            listProductsCategoryTree: await ProductCategoryService.treeProductCategory()
        });
    }
    catch(error) {  
        console.log(error);
    }
}

// [POST] /admin/products/create
module.exports.create = async (req, res) => {
    try {
        const {code, message, record} = await ProductService.create(req.body, res.locals.account._id);
        req.flash('success', 'Tạo sản phẩm thành công');
        res.redirect('back');
    }
    catch(error) {
        console.log('Lỗi tạo danh mục', error);
    }
}

// [GET] /admin/products/edit/:id
module.exports.editUI = async (req, res) => {
    try {
        const product_id = req.params.id;

        // tạo cây danh mục 
        const listProductsCategoryTree = await ProductCategoryService.treeProductCategory();

        // tìm kiếm database
        const {code, message, record} = await ProductService.findById(product_id);
        
        res.render("admin/pages/products/edit", {
            title: "Chỉnh sửa",
            record,
            listProductsCategoryTree
        })
        
    }
    catch(error) {
        console.log('Trang chỉnh sửa sản phẩm', error);
    }
}

// [PATCH] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const {code, message, record} = await ProductService.edit(req.params.id, req.body);
        req.flash('success', 'Chỉnh sửa sản phẩm thành công');
        res.redirect('back');  
    }
    catch(error) {
        console.log("Lỗi tính năng chỉnh sửa sản phẩm", error);
    }
}

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try{
        const { record } = await ProductService.findById(req.params.id);

        // danh sách hành động trong sản phẩm này
        let by = [];

        // nếu sản phẩm này có người tạo thì sẽ lấy thông tin người tạo sản phẩm
        if(record.createdBy.userId !== undefined) {
            const account = await AccountService.findById(record.createdBy.userId);
            by.push({fullName: account.record.fullName, date: record.createdBy.createAt, action: 'Tạo sản phẩm'})
        }

        // nếu sản phẩm này có người xóa thì sẽ lấy thông tin người xóa sản phẩm
        if(record.deletedBy.userId !== undefined) {
            const account = await AccountService.findById(record.deletedBy.userId);
            by.push({fullName: account.record.fullName, date: record.deletedBy.deleteAt, action: 'Xóa sản phẩm'})
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

        // format lại giá tiền mặc định
        record['priceBase'] =  formatCashHelper.toVND(record.price);

        // tính giá mới sau đó format lại giá tiền mới đó
        const newPrice = discountHelper.withDiscount(record.price, record.discountPercentage);
        record['newPrice'] = formatCashHelper.toVND(newPrice);

        res.render('admin/pages/products/detail', {
            title: "Chi tiết sản phẩm",
            record,
            by
        });
    }
    catch(error) {
        console.log('Lỗi trang chi tiết sản phẩm', error);
    }
}