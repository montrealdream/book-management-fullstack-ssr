/**
 * @description Sort Helper
 * @author GIANG TRƯỜNG
*/

module.exports.sortQuery = (query) => {
    const sortObject = {};
    
    let sortKey = query.sortKey || 'position';
    let sortValue = query.sortValue || 'desc';
    sortObject[sortKey] = sortValue;

    return sortObject;
}