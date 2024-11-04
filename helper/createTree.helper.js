/**
 * @description Create Tree Helper
 * @author GIANG TRƯỜNG
*/

/**
 * @description Hàm tạo cây danh mục
 * @param {*} listProductsCategory 
 * @param {*} parent_category_id 
 * @returns 
 */

const createTree = (listProductsCategory, parent_category_id = "") => {
    let arr = []; // mảng sẽ chứa cây danh mục

    listProductsCategory.forEach(category => {
        const parentCategoryId = category.parent_category_id;
        const newCategory = category;

        // dùng phương pháp đệ quy vét cạn
        if(parent_category_id === parentCategoryId) {
            const childrenCategoryId = category.id; // sẽ làm id danh mục cha tiếp theo.

            const children = createTree(listProductsCategory, childrenCategoryId);

            // nếu có danh mục con thì đẩy vào
            if(children.length > 0) 
                newCategory.children = children;

            arr.push(newCategory);
        }
    });
    return arr;
}

module.exports = (listProductsCategory) => {
    return createTree(listProductsCategory);
}