/**
 * @description Discount Helper (Tính toán giảm giá)
 * @author GIANG TRƯỜNG
*/

module.exports.withDiscount = (price, discountPercentage) => {
    return ((100 -  discountPercentage) / 100) * price;
}