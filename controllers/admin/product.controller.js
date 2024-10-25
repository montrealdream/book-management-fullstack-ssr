/**
 * @description Controller Admin Products (Sản phẩm)
 * @author GIANG TRƯỜNG
*/

const Product = require('../../models/product.model');

const filterHelper = require('../../helper/filter.helper');
const searchHelper = require('../../helper/search.helper');

// [GET] /admin/products/
module.exports.index = async (req, res) => {
    try {
        // mặc định sẽ lấy ra những sản phẩm chưa bị xóa
        const findObject = {
            deleted: false
        }

        // bộ lọc trạng thái
        if(req.query.status) findObject.status = req.query.status;
        const filterStatusArray = filterHelper.filterStatus(req.query);

        // tính năng tìm kiếm
        let keyword = "";
        const searchObject = searchHelper.searchKeyword(req.query);
        if(searchObject.keywordRegex !== "")
            findObject.title = searchObject.keywordRegex;

        const records  = await Product.find(findObject);
        
        res.render("admin/pages/products", {
            title: "Danh sách sản phẩm",
            records,
            filterStatusArray, // khối giao diện bộ lọc trạng thái
            keyword: searchObject.keyword
        });
    }
    catch(error) {
        console.log("Danh sách sản phẩm xảy ra lỗi");
    }

}