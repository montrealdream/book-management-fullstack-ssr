/**
 * @description Search Helper
 * @author GIANG TRƯỜNG
*/

// Tìm kiếm sản phẩm theo keyword (không phân biệt hoa thường)
module.exports.searchKeyword =  (query) => {
    const searchObject = {
        keyword: "",
        keywordRegex : ""
    };

    if(query.keyword) {
        searchObject.keyword = query.keyword;
        searchObject.keywordRegex = new RegExp(query.keyword, "i"); // flag i tìm kiếm không phân biệt hoa thường
    }

    return searchObject;
}