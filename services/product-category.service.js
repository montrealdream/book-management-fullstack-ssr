/**
 * @description Service Product Category (Sản phẩm)
 * @author GIANG TRƯỜNG
*/

// Model Database
const ProductCategory = require('../models/product-category.model');

// Package Helper
const createTreeHelper = require('../helper/createTree.helper');

class ProductCategoryService {

    // tạo cây danh mục
    static async treeProductCategory() {
        // lấy ra danh sách danh mục
        const listProductsCategory = await ProductCategory.find({deleted: false})

        // tạo cây danh mục
        const listProductsCategoryTree = createTreeHelper(listProductsCategory);
        
        return listProductsCategoryTree;
    }
}

module.exports = ProductCategoryService;