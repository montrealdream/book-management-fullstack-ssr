/**
 * @description Service Admin Role (Nhóm quyền)
 * @author GIANG TRƯỜNG
*/

const Role = require('../models/role.model');

const filterHelper = require('../helper/filter.helper');
const searchHelper = require('../helper/search.helper');
const paginationHelper = require('../helper/pagination.helper');
const sortHelper = require('../helper/sort.helper');

class RoleService {
    // danh sách nhóm quyền
    static async getListRole(query) {
        const findObject = {
            deleted: false
        }

        // bộ lọc trạng thái
        if(query.status) findObject.status = query.status;
        const filterStatusArray = filterHelper.filterStatus(query);

        // tính năng tìm kiếm theo keyword
        const searchObject = searchHelper.searchKeyword(query);
        if(searchObject.keywordRegex !== "")
            findObject.title = searchObject.keywordRegex;

        // đếm số lượng sản phẩm (theo các tiêu chí bên trên)
        const quantityRecords = await Role.countDocuments(findObject);

        // sắp xếp
        const sortObject = sortHelper.sortQuery(query);

        // phân trang
        const paginationObject = paginationHelper.pagination(query, quantityRecords);

        // tìm kiếm database
        const records  = await Role.find(findObject)
                                .limit(paginationObject.limit)
                                .skip(paginationObject.skip)
                                .sort(sortObject)

        return {
            records,
            filterStatusArray,
            keyword: searchObject.keyword,
            paginationObject
        }
    }

    // xóa nhóm quyền
    static async deleteSoft(role_id) {
        await Role.updateOne(
            {
                _id: role_id
            }, {
                deleted: true
            }
        );
    }

    // tạo mới nhóm quyền
    static async create(payload) {
        const record  = new Role(payload);
        await record.save();
    }

    // lấy nhóm quyền theo id
    static async getRoleById(role_id) {
        const record = await Role.findOne({_id: role_id, deleted: false});

        return record;
    }

    // chỉnh sửa nhóm quyền
    static async edit(role_id, payload) {
        await Role.updateOne(
            {
                _id: role_id
            }, 
            payload
        )
    }

    // giao diện phân quyền
    static async permissionUI() {
        const roles = await Role.find({deleted: false})
                            .select("-description")
        return roles;
    }

    // phân quyền
    static async permission(permission = []) {

        permission.forEach( async item => {
            const {id, permissions} = item;
            
            await Role.updateOne({
                _id: id
            }, {
                permissions: permissions
            });
        });
    }
}

module.exports = RoleService;