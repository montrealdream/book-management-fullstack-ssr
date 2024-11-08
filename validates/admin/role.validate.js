/**
 * @description Validate Admin Role (Nhóm quyền)
 * @author GIANG TRƯỜNG
*/

// [POST] /admin/roles/create
module.exports.create = async (req, res, next) => {
    try {
        if(req.body.title === "") {
            req.flash('warning', 'Tên của quyền không được để trống');
            res.redirect('back');
            return;
        }
        next(); // di chuyển đến middleware tiếp theo hoặc controller
    }
    catch(error) {

    }
}