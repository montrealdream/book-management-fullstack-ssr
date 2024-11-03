/**
 * @description Model Product Category (Danh Mục Sản phẩm)
 * @author GIANG TRƯỜNG
*/

const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

// schema
const productCategorySchema = new mongoose.Schema(
    {
        title: String,
        slug: {
            type: String,
            slug: "title", // tạo slug dựa vào title
            unique: true   // tạo slug riêng biệt, tên giống nhau thì gắn thêm token ngẫu nhiên
        },
        parent_category_id: String,     // id danh mục cha nếu có
        description: String,
        thumbnail: String,
        status: String,
        deleted: {
            type:Boolean,
            default: false // mặc định chưa xóa sản phẩm
        },

        // Lưu giữ user
        createdBy : {
            userId: String,
            createAt: {
                type: Date,
                default: new Date()
            }
        },

        updatedBy : [
            {
                userId: String,
                action: String, // hành động khi chỉnh sửa
                deletedAt: String
            }
        ],

        deletedBy : {
            userId: String,
            deleteAt: Date
        }
    },
);

// modal
const ProductCategory = mongoose.model("ProductCategory", productCategorySchema, 'products-category');

// exports
module.exports = ProductCategory;