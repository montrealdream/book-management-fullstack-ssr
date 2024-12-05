const User = require('../../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const generateHelper = require('../../helper/generate.helper');

// [GET] /user/signup
module.exports.signupUI = async (req, res) => {
    try {
        res.render('client/pages/users/sign-up', {
            title: "Đăng Ký Tài Khoản"
        })
    }
    catch(error) {

    }
}

// [POST] /user/signup
module.exports.signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        
        // kiểm tra email đã được sử dụng chưa
        const emailExits = await User.findOne({
            email: email,
            status: 'active',
            deleted: false
        }).select('-password');

        if(emailExits) {
            req.flash('warning', 'Email đã được sử dụng');
            res.redirect('back');
        }

        // mã hóa mật khẩu
        const passwordHash = await bcrypt.hash(password, saltRounds); 

        // tạo token cho user
        const token = generateHelper.randomString(30) + Date.now();

        // tạo mới user
        const record = new User({
            fullName,
            email,
            password: passwordHash,
            token
        });

        await record.save();

        // jwt rồi chuyển về trang đăng nhập
        const payload = {id: record.id, email: record.email};
        const secret  = process.env.JWT_SECRET;

        const tokenJWT = jwt.sign(payload, secret, {
            expiresIn: '2 days'
        });
        
        //  set cookie 
        const TWO_DAYS =  2* 24 * 60 * 1000; // thời gian hết hạn cookie
        res.cookie('userClient', tokenJWT, { 
            expires: new Date(Date.now() + TWO_DAYS), 
            httpOnly: true 
        });
        
        res.redirect('/');
    }
    catch(error) {

    }
}