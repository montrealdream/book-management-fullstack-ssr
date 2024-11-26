/**
 * @description Controller Client Home (Trang chủ)
 * @author GIANG TRƯỜNG
*/

// Modal
const Product = require('../../models/product.model');

// Helper
const formatCashHelper = require('../../helper/formatCash.helper'); 

// [GET] /products/
module.exports.index = async (req, res) => {
    try{
        const findObject = {
            status: "active",
            deleted: false
        }

        const meta = await Product.find(findObject)
                                    .limit(12)

        const records = meta.map(item => {
            item.newPrice = formatCashHelper.toVND(item.price);
            return item;
        })

        res.render('client/pages/products/index', {
            title: "Danh sách sản phẩm",
            records
        })
    }
    catch(error) {
        console.log('Lỗi trang chủ Client', error);
    }
}