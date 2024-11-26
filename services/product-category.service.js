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

    // Tìm danh sách danh mục
    static async findAll (query) {
        const filter = { deleted: false }
    
        if(query.status) filter.status = query.status;
        const filterStatusArray = filterHelper.filterStatus(query);
        
        // tìm kiếm theo keyword
        const { keyword, title, slug } = searchHelper.searchKeywordAdvanced(query);
    
        // sắp xếp
        const sortObject = sortHelper.sortQuery(query);
    
        // đếm số lượng sản phẩm (theo các tiêu chí bên trên)
        const quantityRecords = await ProductCategory.countDocuments(filter);
    
        // phân trang
        const paginationObject = paginationHelper.pagination(query, quantityRecords);
    
        if(title && slug) {
            filter["$or"] = [ { title }, { slug } ];
        }
    
        const records  = await ProductCategory.find(filter)
                                .limit(paginationObject.limit)
                                .skip(paginationObject.skip)
                                .sort(sortObject)
        return {
            records,
            filterStatusArray,
            keyword,
            paginationObject
        }
    }

    // tìm kiếm một danh mục theo id
    static async findById(category_id) {
        // tìm kiếm database
        const record = await ProductCategory.findOne({
            _id: category_id,
            deleted: false
        });

        return {
            code: 200,
            message: 'Tìm danh mục thành công',
            record
        };
    }

    // tạo mới danh mục
    static async create(payload, account_id) {
        if(payload.position === "") {
            payload.position = await ProductCategory.countDocuments({
                status: "active",
                deleted: false,
            }) + 1;
        }

        else payload.position = parseInt(payload.position);

        // lưu user tạo danh mục 
        payload.createdBy = { userId: account_id, createAt: new Date() };

        // tạo bản ghi mới và lưu vào db
        const record  = new ProductCategory(payload);
        await record.save();

        return {
            code: 200,
            message: 'Tạo mới danh mục thành công',
            record
        }
    }
    
    // chỉnh sửa danh mục
    static async edit(category_id, payload) {
        if(payload.position === "") {
            payload.position = await ProductCategory.countDocuments({
                status: "active",
                deleted: false,
            }) + 1;
        }

        else payload.position = parseInt(payload.position);

        const record = await ProductCategory.updateOne(
            {
                _id: category_id
            }, 
            payload
        );

        return {
            code: 200,
            message: 'Chỉnh sửa danh mục thành công',
            record
        }
    }

    // tạo cây danh mục
    static async treeProductCategory() {
        // lấy ra danh sách danh mục
        const listProductsCategory = await ProductCategory.find({deleted: false})

        // tạo cây danh mục
        const listProductsCategoryTree = createTreeHelper(listProductsCategory);

        return listProductsCategoryTree;
    }

    // thay đổi trạng thái danh mục
    static async changeStatus (category_id, status, account_id) {
        const statusValid = ["active", "inactive"];
        if(statusValid.includes(status) === false) 
            return {
                code: 400,
                message: 'Thay đổi trạng thái thất bại'
            }
        
        const contentStatus = status === "active" ? 'Hoạt động' : 'Dừng hoạt động';
        const updatedBy = {
            userId: account_id, 
            action: `Thay đổi trạng thái danh mục thành ${contentStatus}`,
            updateAt: new Date()
        }

        const record = await ProductCategory.updateOne({ _id: category_id }, 
            { 
                $push: { updatedBy:  updatedBy},
                status: status 
            }
        );

        return {
            code: 200,
            message: 'Thay đổi trạng thái thành công',
            record
        }
    }

    // xóa mềm danh mục
    static async deleteSoft(category_id, account_id) {
        const record = await ProductCategory.updateOne({_id: category_id}, 
            {
                deletedBy: {userId: account_id, deleteAt: new Date()},
                deleted: true
            }   
        );
        return {
            code: 200,
            message: 'Xóa danh mục thành công',
            record
        }
    }
}

module.exports = ProductCategoryService;