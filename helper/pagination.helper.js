/**
 * @description Pagination Helper
 * @author GIANG TRƯỜNG
*/

// Phân trang
module.exports.pagination = (query, quantityRecords) => {
    const paginationObject = {
        limit: 5,        // giới hạn số sản phẩm một trang
        current: 1,     // mặc định là trang 1
        skip: 0          // số sản phẩm bỏ qua trong database là 0 (vì mặc định ở trang 1)   
    }

    if(query.page) {
        paginationObject.current = parseInt(query.page); // lấy số trang hiện tại

        paginationObject.skip = (paginationObject.current - 1) * paginationObject.limit; // tính số sản phẩm bỏ qua trong database
    }

    paginationObject.total = Math.ceil(quantityRecords / paginationObject.limit); // tính tổng số trang

    return paginationObject;
}