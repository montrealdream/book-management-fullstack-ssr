// Model
const Product = require('../../models/product.model');

// Helper
const searchHelper = require('../../helper/search.helper');

// [GET] /search/
module.exports.index = async (req, res) => {
    try {
        res.render('client/pages/searches/index', {
            title: "Kết quả tìm kiếm"
        })
    }
    catch (error) {
        console.log(error);
    }
}

// [GET] /search/suggest?keyword 
module.exports.suggest = async (req, res) => {
    try {
        const keyword = req.query.keyword;

        const searchObject = searchHelper.searchKeywordAdvanced(req.query);

        const records = await Product.find({
            $or: [
                {
                    title: searchObject.title,
                },
                {
                    slug: searchObject.slug
                }
            ],
            status: 'active',
            deleted: false
        });

        res.json({
            code: 200,
            content: 'ok',
            records
        })
    }   
    catch (error) {
        console.log(error);
    }
}