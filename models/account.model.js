/**
 * @description Model Account (Tài khoản quản trị)
 * @author GIANG TRƯỜNG
*/

const mongoose = require('mongoose');

// schema
const accountSchema = new mongoose.Schema(
    {   
        token: String,
        fullName: String,
        email: String,
        tel: String,
        password: String,
        role_id: String, // id của vai trò quản trị
        avatar: String,
        status: String,
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
const Account = mongoose.model("Account", accountSchema, 'accounts');

// exports
module.exports = Account;