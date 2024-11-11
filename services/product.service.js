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

class ProductService {

    // lấy danh sách sản phẩm
    static async getListProduct(body, query) {
        // mặc định sẽ lấy ra những sản phẩm chưa bị xóa
        const findObject = {
            deleted: false
        }

        // bộ lọc trạng thái
        if(query.status) findObject.status = query.status;
        const filterStatusArray = filterHelper.filterStatus(query);

        // tìm kiếm theo keyword
        let keyword = "";
        const searchObject = searchHelper.searchKeyword(query);
        if(searchObject.keywordRegex !== "")
            findObject.title = searchObject.keywordRegex;

        // đếm số lượng sản phẩm (theo các tiêu chí bên trên)
        const quantityRecords = await Product.countDocuments(findObject);

        // sắp xếp
        const sortObject = {};
        let sortKey = query.sortKey || 'position';
        let sortValue = query.sortValue || 'desc';
        sortObject[sortKey] = sortValue;

        // phân trang
        const paginationObject = paginationHelper.pagination(query, quantityRecords);

        // tìm kiếm database
        const records  = await Product.find(findObject)
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

    // lấy sản phẩm theo ID
    static findProductById({product_id}) {

    }

    // tạo sản phẩm
    static async createProduct(body) {
        // format lại một số trường về định dạng number
        body.price = parseInt(body.price);
        body.discountPercentage = parseInt(body.discountPercentage);
        body.stock = parseInt(body.stock);

        if(body.position === "") {
            body.position = await Product.countDocuments({
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
        const record  = new Product(body);
        await record.save();
        return {
            code: 'xxx',
            record
        }
    }
}

module.exports = ProductService;