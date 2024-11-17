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
        console.log(error);
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

        // sử dụng jwt token để gán login
        const payload = { id: account._id, email: account.email }
        const secret  = process.env.JWT_SECRET;

        const tokenJWT = jwt.sign(payload, secret, {
            expiresIn: '2 days'
        })

        //  set cookie 
        const TWO_DAYS =  2* 24 * 60 * 1000; // thời gian hết hạn cookie
        res.cookie('acc', tokenJWT, { 
            expires: new Date(Date.now() + TWO_DAYS), 
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