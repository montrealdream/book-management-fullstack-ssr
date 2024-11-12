/**
 * @description Model Product Category (Danh Mục Sản phẩm)
 * @author GIANG TRƯỜNG
*/

const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const DOCUMMENT_NAME = 'ProductCategory';
const COLLECTION_NAME = 'products-category';

// schema
const productCategorySchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, slug: "title", unique: true },
        parent_category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'products-category' },     // id danh mục cha nếu có
        description: String,
        thumbnail:  { type: String, required: true },
        status: { type: String, enum: ['active', 'inactive'], default: 'active' },  
        deleted: { type:Boolean, default: false },

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
    }, {
        timestamps: true
    }
);

// modal
const ProductCategory = mongoose.model(DOCUMMENT_NAME, productCategorySchema, COLLECTION_NAME);

// exports
module.exports = ProductCategory;