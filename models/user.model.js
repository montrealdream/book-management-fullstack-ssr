/**
 * @description Model Account (Tài khoản Client)
 * @author GIANG TRƯỜNG
*/

const mongoose = require('mongoose');

// schema
const userSchema = new mongoose.Schema(
    {   
        token: String,
        fullName: String,
        email: String,
        tel: String,
        password: String,
        avatar: String,
        status: {
            type: String,
            default: 'active',
        },
        deleted: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true,
    }
);

// modal
const User = mongoose.model("User", userSchema, 'users');

// exports
module.exports = User;
