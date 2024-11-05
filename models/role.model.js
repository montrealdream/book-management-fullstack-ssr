/**
 * @description Model Role (Nhóm quyền)
 * @author GIANG TRƯỜNG
*/

const mongoose = require('mongoose');

// schema
const roleSchema = new mongoose.Schema(
    {   
        title: String,
        description: String,
        permissions: {
            type: Array,
            default: []
        },
        deleted: {
            type: Boolean,
            default: false
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
const Role = mongoose.model("Role", roleSchema, 'roles');

// exports
module.exports = Role;