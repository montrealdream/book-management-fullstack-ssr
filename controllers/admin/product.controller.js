/**
 * @description Controller Admin Products (Sản phẩm)
 * @author GIANG TRƯỜNG
*/

const Product = require('../../models/product.model');

const filterHelper = require('../../helper/filter.helper');

// [GET] /admin/products/
module.exports.index = async (req, res) => {
    // mặc định sẽ lấy ra những sản phẩm chưa bị xóa
    const findObject = {
        deleted: false
    }

    // bộ lọc trạng thái
    if(req.query.status) findObject.status = req.query.status;
    const filterStatusArray = filterHelper.filterStatus(req.query);

    const records  = await Product.find(findObject);
    
    res.render("admin/pages/products", {
        title: "Danh sách sản phẩm",
        records,
        filterStatusArray // khối giao diện bộ lọc trạng thái
    });
}