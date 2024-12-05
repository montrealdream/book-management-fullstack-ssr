/**
 * @description Controller Client Home (Trang chủ)
 * @author GIANG TRƯỜNG
*/

// Modal
const Product = require('../../models/product.model');

// Helper
const formatCashHelper = require('../../helper/formatCash.helper'); 
const { response } = require('express');

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

// [GET] /products/detail/:slugProduct
module.exports.detail = async (req, res) => {
    try {
        const product_slug = req.params.slugProduct;
        
        const record = await Product.findOne({slug: product_slug});

        record.oldPrice = formatCashHelper.toVND(record.price);

        // tính discount
        const priceWithDiscount = ((100 - record.discountPercentage) / 100) * record.price;
        record.newPrice = formatCashHelper.toVND(priceWithDiscount);

        res.render('client/pages/products/detail', {
            title: `Chi tiết ${record.title}`,
            record
        });
    } catch (error) {
        
    }
}