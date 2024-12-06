const User = require('../../models/user.model');
const ForgotPassword = require('../../models/forgot-password.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const generateHelper = require('../../helper/generate.helper');
const mailHelper = require('../../helper/mail.helper');

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
            return;
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

// [GET] /user/password/forgot
module.exports.forgotPasswordUI = async (req, res) => {
    try {
        res.render('client/pages/users/forgot-password', {
            title: "Quên Mật Khẩu"
        })
    }
    catch(error) {

    }
}

// [POST] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
    try {
        const email = req.body.email;

        // kiểm tra xem email có tồn tại không
        const user = await User.findOne({
            email: email,
            // status: 'active',
            deleted: false
        }).select('-password');

        if(!user) {
            req.flash('warning', 'Email không hợp lệ');
            res.redirect('back');
            return;
        }

        // tạo mã otp
        const otp = generateHelper.randomStringNum(6);

        // lưu vào db
        const record = new ForgotPassword({
            email,
            otp,
            expireAt: Date.now() + (3*60*1000), // 1000ms * 60 * 3 = 3 phút
        });
        await record.save();
        
        // gửi mail
        const subject = `Mã OTP xác minh lấy lại mật khẩu`;
        const content = `
            <div style="width: 100vw; height: 100vh; display: flex; justify-content: center; align-items: center;">
                <div style="width: 500px; border: 1px solid #ddd; padding: 10px 8px;">
                    <h3 style="margin= 0; padding: 10px 0px;">Mã OTP <b>${otp}</b></h3>
                    <p style="margin= 0; padding: 10px 0px;">Mã OTP sẽ hết hiệu lực sau 3 phút</p>
                </div>
            </div>
        `;

        mailHelper.send(email, subject, content);

        res.redirect('/user/');
    }
    catch(error) {

    }
}