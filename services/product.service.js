/**
 * @description Service Products (Sản phẩm)
 * @author GIANG TRƯỜNG
*/

// Model Database
const Product = require('../models/product.model');

// Package Helper
const filterHelper = require('../helper/filter.helper');
const searchHelper = require('../helper/search.helper');
const paginationHelper = require('../helper/pagination.helper');
const createTreeHelper = require('../helper/createTree.helper');
const sortHelper = require('../helper/sort.helper');

class ProductService {
    // Tìm danh sách sản phẩm
    static async findAll(query) {
        const filter = { deleted: false }
    
        if(query.status) filter.status = query.status;
        const filterStatusArray = filterHelper.filterStatus(query);
        
        // tìm kiếm theo keyword
        const { keyword, title, slug } = searchHelper.searchKeywordAdvanced(query);
    
        // sắp xếp
        const sortObject = sortHelper.sortQuery(query);
    
        // đếm số lượng sản phẩm (theo các tiêu chí bên trên)
        const quantityRecords = await Product.countDocuments(filter);
    
        // phân trang
        const paginationObject = paginationHelper.pagination(query, quantityRecords);
    
        if(title && slug) {
            filter["$or"] = [ { title }, { slug } ];
        }
    
        const records  = await Product.find(filter)
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

    // lấy sản phẩm theo ID
    static async findById(product_id) {
        const record = await Product.findOne( {
            _id: product_id,
            deleted: false
        });

        return {
            code: 200,
            message: 'Tìm sản phẩm thành công',
            record
        };
    }

    // tạo sản phẩm
    static async createProduct(payload) {
        // format lại một số trường về định dạng number
        payload.price = parseInt(payload.price);
        payload.discountPercentage = parseInt(payload.discountPercentage);
        payload.stock = parseInt(payload.stock);

        if(payload.position === "") {
            payload.position = await Product.countDocuments({
                status: "active",
                deleted: false,
            }) + 1;
        }

        else payload.position = parseInt(payload.position);

        // upload một ảnh vào thư mục local
        // req.body[req.file.fieldname] = `/uploads/${req.file.filename}`;

        // upload nhiều ảnh vào thư mục local
        // req.body[req.files[0].fieldname] = req.files.map(item => `/uploads/${item.filename}`);

        // tạo bản ghi mới và lưu vào db
        const record  = new Product(payload);
        await record.save();

        return {
            code: 200,
            message: ' Tạo sản phẩm thành công',
            record
        }
    }

    // chỉnh sửa sản phẩm
    static async edit (product_id, payload) {
        // format lại một số trường về định dạng number
        payload.price = parseInt(payload.price);
        payload.discountPercentage = parseInt(payload.discountPercentage);
        payload.stock = parseInt(payload.stock);

        if(payload.position === "") {
            payload.position = await Product.countDocuments({
                status: "active",
                deleted: false,
            }) + 1;
        }

        else payload.position = parseInt(payload.position);

        const record = await Product.updateOne(
            {
                _id: product_id
            }, 
            payload
        )

        return {
            code: 200,
            message: ' Tạo sản phẩm thành công',
            record
        }
    }

    // thay đổi trạng thái sản phẩm
    static async changeStatus (product_id, status) {
        const statusValid = ["active", "inactive"];
        if(statusValid.includes(status) === false) 
            return {
                code: 400,
                message: 'Thay đổi trạng thái thất bại'
            }

        await Product.updateOne({ _id: product_id }, { status: status });

        return {
            code: 200,
            message: 'Thay đổi trạng thái thành công'
        }
    }

    // xóa mềm sản phẩm
    static async deleteSoft(product_id) {
        await Product.updateOne({_id: product_id}, {deleted: true});
        return {
            code: 200,
            message: 'Xóa sản phẩm thành công'
        }
    }
}

module.exports = ProductService;