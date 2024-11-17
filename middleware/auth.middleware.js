/**
 * @description Authencation Middleware
 * @author GIANG TRƯỜNG
*/

const Account = require('../models/account.model');

const systemConfig = require('../config/system.config');
const PATH_ADMIN = systemConfig.PATH_ADMIN; // đường dẫn /admin

const jwt = require('jsonwebtoken');

module.exports.requireAuth = async (req, res, next) => {
    try {
        const tokenAccount = req.cookies['acc']; // lấy token trên user
        
        if(!tokenAccount) {
            res.redirect(PATH_ADMIN + '/auth/login');
            return;
        }      

        // verify token lấy về
        const secret = process.env.JWT_SECRET;
        const tokenVerify = jwt.verify(tokenAccount, secret);
        
        const account = await Account.findOne({
            email: tokenVerify.email,
            status: "active",
            deleted: false
        }).select("-password")
                                        

        if(!account) {
            res.redirect(PATH_ADMIN + '/auth/login');
            return;
        }         
        
        // lấy nhóm quyền mà account này có

        res.locals.account = account;
        // respone nhóm quyền của account

        next();
    }
    catch(error) {
        console.log(error);
    }
}