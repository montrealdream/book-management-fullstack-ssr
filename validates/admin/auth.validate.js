/**
 * @description Validate Admin Authen
 * @author GIANG TRƯỜNG
*/

const accountValidateHelper = require('../../helper/accountValidate.helper');

// [POST] /admin/auth/login
module.exports.login = async (req, res, next) => {
    try {
        // check email
        const emailValidate = accountValidateHelper.email(req.body.email);
        if(emailValidate.status === false) {
            req.flash('warning', emailValidate.message);
            res.redirect('back');
            return;
        }

        // check mật khẩu, các kí tự đặc biệt của mật khẩu: @, $, #, *, !, %, &
        const passwordValidate = accountValidateHelper.passwordCreate(req.body.password);
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