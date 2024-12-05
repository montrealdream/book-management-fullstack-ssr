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

// [GET] /user/login
module.exports.loginUI = async (req, res) => {
    try {
        res.render('client/pages/users/login', {
            title: "Đăng nhập"
        })
    }
    catch(error) {

    }
}

// [POST] /user/login
module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // kiểm tra email có tồn tại không
        const user = await User.findOne({email: email, deleted: false});
        if(!user) {
            req.flash('warning', 'Email không chính xác');
            res.redirect('back');
            return;
        }

        // kiểm tra mật khẩu 
        bcrypt.compare(password, user.password, (err, result) => {
            if(result === false) {
                req.flash('warning', 'Sai mật khẩu');
                res.redirect('back');
                return;
            }
        });

        // kiểm tra tài khoản không bị khóa
        if(user.status === "inactive") {
            req.flash('warning', 'Tài khoản đã bị khóa');
            res.redirect('back');
            return;
        }

        // verify jwt
        const payload = { id: user.id, email }
        const secret = process.env.JWT_SECRET;
        const tokenJWT = jwt.sign(payload, secret, {
            expiresIn: '2 days'
        });

        // set cookie
        const TWO_DAYS =  2* 24 * 60 * 1000; // thời gian hết hạn cookie
        res.cookie('userClient', tokenJWT, { 
            expires: new Date(Date.now() + TWO_DAYS), 
            httpOnly: true 
        });
        
        res.redirect('/'); // vào trang chủ
    }
    catch(error) {
        console.log('USER LOGIN ERROR', error);
    }
}