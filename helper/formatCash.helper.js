/**
 * @description Cash Helper (Hỗ trợ định dạng tiền tệ)
 * @author GIANG TRƯỜNG
*/

module.exports.toVND = (price) => {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    return VND.format(price);
}