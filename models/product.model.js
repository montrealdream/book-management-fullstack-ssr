/**
 * @description Model Products (Sản phẩm)
 * @author GIANG TRƯỜNG
*/

const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

// schema
const productSchema = new mongoose.Schema(
    {
        title: String,
        slug: {
            type: String,
            slug: "title", // tạo slug dựa vào title
            unique: true   // tạo slug riêng biệt, tên giống nhau thì gắn thêm token ngẫu nhiên
        },
        author: String,             // tác giả của sách
        category_id: String,
        thumbnail: String,
        description: String,
        price: Number,
        discountPercentage: Number, // % giảm giá
        stock: Number,
        position: Number,
        sold: Number, // số lượng sản phẩm đã bán
        status: String,
        deleted: {
            type:Boolean,
            default: false // mặc định chưa xóa sản phẩm
        },
        featured: Boolean, // sản phẩm nổi bật

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
const Product = mongoose.model("Product", productSchema, 'products');

// exports
module.exports = Product;