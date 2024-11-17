/**
 * @description Service Admin Authen
 * @author GIANG TRƯỜNG
*/

const Account = require('../models/account.model');

const generateHelper = require('../helper/generate.helper');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Số vòng lặp, càng cao càng an toàn

class AuthService {
    // login
    static async login(email, password) {
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

        return tokenJWT;
    }
}

module.exports = AuthService;