/**
 * @description Account Helper (Hỗ trợ validate account quản trị)
 * @author GIANG TRƯỜNG
*/

const unidecode = require('unidecode');

// Validate Email
module.exports.email = (email) => {
    const errorsLog = [
        {
            status: true,
            message: "Email hợp lệ"
        }, 
        {
            status: false,
            message:  "Email không để trống !"
        }, 
        {
            status: false,
            message: "Email không hợp lệ"
        }, 
    ];

    if(email === "")
        return errorsLog[1];

    const regexEmail = /[\w\.]+@\w+(\.\w+)+/
    if(!regexEmail.test(email))
        return errorsLog[2];
    
    return errorsLog[0]; // hợp lệ
}

// Validate Mật khẩu
module.exports.password = (password) => {
    const errorsLog = [
        {
            status: true,
            message: "Mật khẩu hợp lệ"
        }, 
        {
            status: false,
            message: "Không được để trống mật khẩu"
        }, 
        {
            status: false,
            message: "Mật khẩu có ít nhất 8 kí tự"
        }, 
    ];
    if(password === "") 
        return errorsLog[1];

    if(password.length < 8) 
        return errorsLog[2];

    return errorsLog[0]; // hợp lệ
}

// Validate Số điện thoại
module.exports.tel = (tel) => {
    const errorsLog = [
        {
            status: true,
            message: "Số điện thoại hợp lệ"
        },
        {
            status: false,
            message: "Không được để trống số điện thoại"
        }, 
        {
            status: false,
            message: "Số điện thoại không chứa chữ cái và các kí tự đặc biệt"
        }, 
        {
            status: false,
            message: "Số điện thoại phải có 10 chữ số"
        }, 
        {
            status: false,
            message: "Số điện thoại không hợp lệ"
        }, 
    ];

    if(tel === "") 
        return errorsLog[1];

    if(tel.length < 10) 
        return errorsLog[2];

    const regexisNotDigit = /[^0-9]/g; // tìm kiếm các kí tự khác các chữ số từ 0-9
    if(regexisNotDigit.test(tel)) 
        return errorsLog[3];

    const regexTel = /^\d{10}$/; // chuỗi số hợp lệ có 10 số
    if(!regexTel.test(tel)) 
        return errorsLog[4];

    return errorsLog[0]; // hợp lệ
}

// Validate Họ Tên
module.exports.fullName = (fullName) => {
    const errorsLog = [
        {
            status: true,
            message: "Họ Tên hợp lệ"
        }, 
        {
            status: false,
            message:  "Họ Tên không để trống !"
        }, 
        {
            status: false,
            message: "Họ Tên không được chứa số và các kí tự đặc biệt"
        }, 
    ];

    if(fullName === "")
        return errorsLog[1];

    const regexisNotAlpha = /[^a-zA-Z\s]/; // tìm kiếm các kí tự khác các chữ cái từ a-z A-Z và khoảng trắng, dùng unidecode đễ đưa về chữ không dấu cho dễ dùng regex kiểm tra
    if(regexisNotAlpha.test(unidecode(fullName))) 
        return errorsLog[2];
    
    return errorsLog[0]; // hợp lệ
}