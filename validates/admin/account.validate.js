/**
 * @description Validate Admin Account (Tài khoản quản trị)
 * @author GIANG TRƯỜNG
*/

// [POST] /admin/accounts/create
module.exports.create = async (req, res, next) => {
    try {
        // check full name
        if(req.body.fullName === "") {
            req.flash('warning', 'Nhập thiếu họ tên');
            res.redirect('back');
            return;
        }

        // check email
        /** Phần trước @ => [\w\.]+  
        Giải thích => [...] có thể khớp với các kí tự bên trong

        Giải thích =>  \w tìm tất cả kí tự [A-Za-z0-9\_] chữ cái in hoa, thường, số, gạch dưới 

        Giải thích =>  \. là lấy kí tự (chấm, dấu chấm) .

        Giải thích =>  +  là lấy một hoặc nhiều 
        */

        // Phần @

        // Phần sau @ và chuỗi kí tự và đứng trước dấu (chấm) . => \w+

        // (1) Phần dấu (chấm) . => \. 

        // (2) Phần sau dấu (chấm) là một chuỗi kí tự: \w+

        /**  Vì nó có thể có tên miền dài, lặp đi lặp lại => cần phải gôm nhóm 2 cái (1) và (2)
        => (\.w+)+
        Giải thích => (...) gôm nhóm lại
        Giải thích => \.\w+ là dấu chấm kèm 1 chuỗi 
        Giải thích => lặp lại ít nhất 1 lần
        Tổng kết   =>  Vậy (\.\w+) nhóm này lặp lại ít nhất 1 lần
        */
        const regexEmail = /[\w\.]+@\w+(\.\w+)+/;
        if(!regexEmail.test(req.body.email)) {
            req.flash('warning', 'Email không hợp lệ');
            res.redirect('back');
            return;
        }
        
        // check số điện thoại
        const regexTel = /^\d{10}$/;
        if(!regexTel.test(req.body.tel)) {
            req.flash('warning', 'Số điện thoại có 10 số');
            res.redirect('back');
            return;
        }
        // check mật khẩu
        // các kí tự đặc biệt của mật khẩu: @, $, #, *, !, %, &
        const regexPassword = /[\w\.\@\$\#\*\!\%\&]{8,}/;
        if(!regexPassword.test(req.body.password)) {
            req.flash('warning', 'Mật khẩu không hợp lệ');
            res.redirect('back');
            return; 
        }

        next(); // di chuyển đến middleware tiếp theo hoặc controller
    }
    catch(error) {

    }
}