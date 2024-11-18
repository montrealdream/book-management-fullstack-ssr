/**
 * @description Search Helper
 * @author GIANG TRƯỜNG
*/

const unidecode = require('unidecode');

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

// Tìm kiếm theo keyword (không phân biệt hoa thường, chữ in thường, in hoa, có dấu, không có dấu)
module.exports.searchKeywordAdvanced = (query) => {
    const searchObject = {
        keyword: "",
        title: "",
        slug: ""
    }

    if(query.keyword) {
        searchObject.keyword = query.keyword;

        // từ khóa có dấu thành không có dấu
        const keywordUnidecode= unidecode(searchObject.keyword)

        // chuyển từ khóa không dấu thành slug
        searchObject.slug = keywordUnidecode.replace(/\s+/g, '-');
        searchObject.slug = new RegExp(searchObject.slug, 'i');

        // tìm từ khóa không phân biệt hoa thường
        searchObject.title = searchObject.keyword.replace(/\s+/g, " ");
        searchObject.title = new RegExp(searchObject.title, 'i');
    }
    return searchObject;
}
