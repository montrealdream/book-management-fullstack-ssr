/**
 * @description Controller Client Home (Trang chủ)
 * @author GIANG TRƯỜNG
*/

// Modal
const Product = require('../../models/product.model');

// Helper
const formatCashHelper = require('../../helper/formatCash.helper'); 

// [GET] /
module.exports.index = async (req, res) => {
    try{
        const findObject = {
            status: "active",
            deleted: false
        }

        const meta = await Product.find(findObject)
                                    .limit(8)

        const records = meta.map(item => {
            item.newPrice = formatCashHelper.toVND(item.price);
            return item;
        })

        res.render('client/pages/homes/index', {
            title: "Trang chủ",
            records
        })
    }
    catch(error) {
        console.log('Lỗi trang chủ Client', error);
    }
}