/**
 * @description Controller Admin Authen
 * @author GIANG TRƯỜNG
*/

const systemConfig = require('../../config/system.config');
const PATH_ADMIN = systemConfig.PATH_ADMIN; // đường dẫn /admin

const AuthService = require('../../services/auth.service');

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
        
        const token = await AuthService.login(email, password);

        //  set cookie 
        const TWO_DAYS =  2* 24 * 60 * 1000; // thời gian hết hạn cookie
        res.cookie('acc', token, { 
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