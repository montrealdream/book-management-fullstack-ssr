/**
 * @description Controller Admin Products (Sản phẩm)
 * @author GIANG TRƯỜNG
*/

const Product = require('../../models/product.model');

// [GET] /admin/products/
module.exports.index = async (req, res) => {
    // mặc định sẽ lấy ra những sản phẩm chưa bị xóa
    const findObject = {
        deleted: false
    }

    const records  = await Product.find(findObject);
    
    console.log(records);
    res.render("admin/pages/products", {
        title: "Danh sách sản phẩm",
        records
    });
}