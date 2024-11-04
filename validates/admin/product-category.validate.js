/**
 * @description Validate Admin Product Category (Danh Mục Sản phẩm)
 * @author GIANG TRƯỜNG
*/

// [POST] /admin/products/create
module.exports.create = async (req, res, next) => {
    try {
        if(req.body.title === "") {
            req.flash('warning', 'Nhập thiếu tiêu đề');
            res.redirect('back');
            return;
        }

        next(); // di chuyển đến middleware tiếp theo hoặc controller
    }
    catch(error) {

    }
}