/**
 * @description Controller Admin Authen
 * @author GIANG TRƯỜNG
*/

const Account = require('../../models/account.model');

const systemConfig = require('../../config/system.config');
const PATH_ADMIN = systemConfig.PATH_ADMIN; // đường dẫn /admin

const generateHelper = require('../../helper/generate.helper');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Số vòng lặp, càng cao càng an toàn

// [GET] /admin/auth/login
module.exports.loginUI = async (req, res) => {
    try {
        res.render("admin/pages/auth/login", {
            title: "Đăng nhập"
        });
    }
    catch(error) {

    }
}

// [POST] /admin/auth/login
module.exports.login = async (req, res) => {
    try {
        let {email, password} = req.body;
        
        // check email
        const account = await Account.findOne({email: email, deleted: false});

        if(!account) {
            req.flash('warning', 'Email không hợp lệ'); 
            return;
        }

        // check mật khẩu
        bcrypt.compare(password, account.password, (err, result) => {
            if(result === false) {
                req.flash('warning', 'Sai mật khẩu');
                return;
            }
        });

        // check trạng thái tài khoản
        if(account.status === "inactive") {
            req.flash('warning', 'Tài khoản đã bị khóa');
            return;
        }

        //  set cookie 
        const ONE_WEEK =  7* 24 * 60 * 1000; // thời gian hết hạn cookie
        res.cookie('acc', account.token, { 
            expires: new Date(Date.now() + ONE_WEEK), 
            httpOnly: true 
        });

        res.redirect(PATH_ADMIN + '/dashboard');
    }
    catch(error) {
        console.log(error);
        console.log('Lỗi đăng nhập')
    }
}

// [GET] /admin/auth/logout 
module.exports.logout = async (req, res) => {
    try {
        res.clearCookie('acc'); // xóa token

        res.redirect(PATH_ADMIN + '/auth/login');
    }
    catch(error) {

    }
}