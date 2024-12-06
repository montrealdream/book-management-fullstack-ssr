/**
 * @description Model Quên Mật Khẩu
 * @author GIANG TRƯỜNG
*/

const mongoose = require('mongoose');

// schema
const forgotPasswordModel = new mongoose.Schema(
    {   
        email: { type: String, required: true },
        otp: { type: String, required: true },
        expireAt: {
            type: Date,  
            expires: 0 //second
        }
    },
    {
        timestamps: true,
    }
);

// modal
const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordModel, 'forgot-password');

// exports
module.exports = ForgotPassword;
