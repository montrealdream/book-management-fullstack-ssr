/**
 * @description Validate Admin Account (Tài khoản quản trị)
 * @author GIANG TRƯỜNG
*/

const accountValidateHelper = require('../../helper/accountValidate.helper');

// [POST] /admin/accounts/create
module.exports.create = async (req, res, next) => {
    try {
        // check full name
        const fullNameValidate = accountValidateHelper.fullName(req.body.fullName);
        if(fullNameValidate.status === false) {
            req.flash('warning', fullNameValidate.message);
            res.redirect('back');
            return;
        }

        // check email
        const emailValidate = accountValidateHelper.email(req.body.email);
        if(emailValidate.status === false) {
            req.flash('warning', emailValidate.message);
            res.redirect('back');
            return;
        }
    
        // check số điện thoại
        const telValidate = accountValidateHelper.tel(req.body.tel);
        if(telValidate.status === false) {
            req.flash('warning', telValidate.message);
            res.redirect('back');
            return;
        }

        // check mật khẩu, các kí tự đặc biệt của mật khẩu: @, $, #, *, !, %, &
        const passwordValidate = accountValidateHelper.password(req.body.password);
        if(passwordValidate.status === false) {
            req.flash('warning', passwordValidate.message);
            res.redirect('back');
            return; 
        }

        next(); // di chuyển đến middleware tiếp theo hoặc controller
    }
    catch(error) {

    }
}