/**
 * @description Controller Admin Account (Tài khoản quản trị)
 * @author GIANG TRƯỜNG
*/

const Account = require('../../models/account.model');

const filterHelper = require('../../helper/filter.helper');
const searchHelper = require('../../helper/search.helper');
const paginationHelper = require('../../helper/pagination.helper');

// [GET] /admin/accounts/
module.exports.index = async (req, res) => {
    try {  
        // mặc định sẽ lấy ra những sản phẩm chưa bị xóa
        const findObject = {
            deleted: false
        }

        // bộ lọc trạng thái
        if(req.query.status) findObject.status = req.query.status;
        const filterStatusArray = filterHelper.filterStatus(req.query);

        // tính năng tìm kiếm theo keyword
        let keyword = "";
        const searchObject = searchHelper.searchKeyword(req.query);
        if(searchObject.keywordRegex !== "")
            findObject.fullName = searchObject.keywordRegex;

        // đếm số lượng sản phẩm (theo các tiêu chí bên trên)
        const quantityRecords = await Account.countDocuments(findObject);
        
        // sắp xếp (chưa ok vì bên account là fullName chớ không phải title)
        const sortObject = {};
        let sortKey =   req.query.sortKey || 'position';
        let sortValue = req.query.sortValue || 'desc';
        sortObject[sortKey] = sortValue;

        // phân trang
        const paginationObject = paginationHelper.pagination(req.query, quantityRecords);

        // tìm kiếm database
        const records  = await Account.find(findObject)
                                        .limit(paginationObject.limit)
                                        .skip(paginationObject.skip)
                                        .sort(sortObject)
        
        res.render("admin/pages/accounts/index", {
            title: "Danh sách tài khoản",
            records,
            filterStatusArray, // khối giao diện bộ lọc trạng thái
            keyword: searchObject.keyword,
            paginationObject
        });
    }
    catch(error) {
        console.log("Danh sách tài khoản xảy ra lỗi");
    }

}