/**
 * @description Service Product Category (Sản phẩm)
 * @author GIANG TRƯỜNG
*/

// Model Database
const ProductCategory = require('../models/product-category.model');

// Package Helper
const createTreeHelper = require('../helper/createTree.helper');
const filterHelper = require('../helper/filter.helper');
const paginationHelper = require('../helper/pagination.helper');
const searchHelper = require('../helper/search.helper');
const sortHelper = require('../helper/sort.helper');

class ProductCategoryService {

    // tạo cây danh mục
    static async treeProductCategory() {
        // lấy ra danh sách danh mục
        const listProductsCategory = await ProductCategory.find({deleted: false})

        // tạo cây danh mục
        const listProductsCategoryTree = createTreeHelper(listProductsCategory);
        
        return listProductsCategoryTree;
    }

    // lấy danh sách danh mục
    static async getListProductCategory(query) {
        const findObject = { deleted: false }; // mặc định sẽ lấy ra những sản phẩm chưa bị xóa
            
        // bộ lọc trạng thái
        if(query.status) findObject.status = query.status;
        const filterStatusArray = filterHelper.filterStatus(query);

        // tính năng tìm kiếm theo keyword
        const searchObject = searchHelper.searchKeyword(query);
        if(query.keyword) findObject.title = query.keyword;

        // đếm số lượng danh mujc (theo các tiêu chí bên trên)
        const quantityRecords = await ProductCategory.countDocuments(findObject);

        // sắp xếp
        const sortObject = sortHelper.sortQuery(query);

        // phân trang
        const paginationObject = paginationHelper.pagination(query, quantityRecords);

        // tìm kiếm database
        const records  = await ProductCategory.find(findObject)
                                        .limit(paginationObject.limit)
                                        .skip(paginationObject.skip)
                                        .sort(sortObject)
        return {
            records,
            filterStatusArray,
            keyword: searchObject.keyword,
            paginationObject
        }
    }

    // thay đổi trạng thái danh mục
    static async changeStatus(category_id, category_status) {
        const statusValid = ["active", "inactive"];

        if(statusValid.includes(category_status) === false) {
            req.flash('warning', 'Trạng thái gửi lên không hợp lệ');
            res.redirect('back');
        }

        // cập nhật trạng thái
        await ProductCategory.updateOne(
            {
                _id: category_id
            },
            {
                status: category_status
            }
        );
    }

    // xóa mềm sản phẩm
    static async deleteSoft(category_id) {
        // xóa mềm
        await ProductCategory.updateOne(
            {
                _id: category_id
            }, {
                deleted: true
            }
        );
    }

    // tạo mới danh mục
    static async create(body) {
        if(body.position === "") {
            body.position = await ProductCategory.countDocuments({
                status: "active",
                deleted: false,
            }) + 1;
        }

        else body.position = parseInt(body.position);
        
        // upload một ảnh vào thư mục local
        // req.body[req.file.fieldname] = `/uploads/${req.file.filename}`;

        // upload nhiều ảnh vào thư mục local
        // req.body[req.files[0].fieldname] = req.files.map(item => `/uploads/${item.filename}`);

        // tạo bản ghi mới và lưu vào db
        const record  = new ProductCategory(body);
        await record.save();
    }

    // tìm kiếm một danh mục theo id
    static async findCategoryById(category_id) {
        // tìm kiếm database
        const record = await ProductCategory.findOne({_id: category_id});
        return record;
    }

    // chỉnh sửa danh mục
    static async edit(category_id, body) {
        if(body.position === "") {
            body.position = await ProductCategory.countDocuments({
                status: "active",
                deleted: false,
            }) + 1;
        }

        else body.position = parseInt(body.position);

        await ProductCategory.updateOne(
            {
                _id: category_id
            }, 
            body
        )
    }
}

module.exports = ProductCategoryService;