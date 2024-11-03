/**
 * @description Validate Admin Products (Sản phẩm)
 * @author GIANG TRƯỜNG
*/

// [POST] /admin/products/create
module.exports.create = async (req, res, next) => {
    try {
        const regexDigit = /^\d{1,}$/;

        console.log(req.body);
        if(!regexDigit.test(req.body.price)) {
            console.log(req.body.price)
            req.flash('warning', 'Nhập sai định dạng giá');
            res.redirect('back');
            return;
        }

        if(!regexDigit.test(req.body.stock)) {
            req.flash('warning', 'Nhập sai định dạng số lượng');
            res.redirect('back');
            return;
        }

        if(!regexDigit.test(req.body.position) && req.body.position !== "") {
            req.flash('warning', 'Nhập sai định dạng vị trí');
            res.redirect('back');
            return;
        }

        // giảm giá thì tối đa chỉ 100%, nghĩa là có 3 kí tự
        const regexDiscount = /^\d{1,3}$/;
        if(!regexDiscount.test(req.body.discountPercentage) && req.body.discountPercentage !== "") {
            req.flash('warning', 'Nhập sai định dạng giảm giá');
            res.redirect('back');
            return;
        }

        next(); // di chuyển đến middleware tiếp theo hoặc controller
    }
    catch(error) {

    }
}