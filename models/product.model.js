/**
 * @description Model Products (Sản phẩm)
 * @author GIANG TRƯỜNG
*/

const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const DOCUMMENT_NAME = 'Product';
const COLLECTION_NAME = 'products';

// schema
const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
            
        slug: {
            type: String,
            slug: "title", // tạo slug dựa vào title
            unique: true   // tạo slug riêng biệt, tên giống nhau thì gắn thêm token ngẫu nhiên
        },
        
        author: {
            // tác giả của sách
            type: String,
            default:""
        },     

        category_id: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products-category'
        },

        thumbnail: {
            type: Array,
            default: [], // upload nhiều ảnh nên cần dùng mảng 
            required: true
        },

        description: String,

        price: { type: Number, required: true },
        
        discountPercentage: { type: Number, default: 0 },
        
        stock: {type: Number, required: true},
        
        position: {
            type: Number,
            min: 0,
            required: true
        },
        
        sold: { type: Number, default: 0 }, // số lượng sản phẩm đã bán
        
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active'
        },
        
        deleted: {
            type:Boolean,
            default: false // mặc định chưa xóa sản phẩm
        },
        
        featured: {
            type: String, 
            enum: ['active', 'inactive'],
            default: 'inactive'
        }, // sản phẩm nổi bật

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
const Product = mongoose.model(DOCUMMENT_NAME, productSchema, COLLECTION_NAME);

// exports
module.exports = Product;