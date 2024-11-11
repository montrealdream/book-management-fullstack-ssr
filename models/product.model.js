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
        slug: { type: String,  slug: "title", unique: true },
        author: {  type: String, default:"" },  // tác giả của sách
        category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'products-category'},
        thumbnail: { type: Array,  default: [], required: true },
        description: String,
        price: { type: Number, required: true },
        discountPercentage: { type: Number, default: 0 },
        stock: {type: Number, required: true},
        position: { type: Number, min: 0, required: true },
        sold: { type: Number, default: 0 }, // số lượng sản phẩm đã bán
        status: { type: String, enum: ['active', 'inactive'], default: 'active' },        
        deleted: { type: Boolean, default: false}, // mặc định chưa xóa sản phẩm
        featured: { type: String, enum: ['active', 'inactive'], default: 'inactive' }, // nổi bật
            
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