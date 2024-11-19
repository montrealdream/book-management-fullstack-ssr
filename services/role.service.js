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
    static async findAll(query) {
        const filter = { deleted: false }
    
        if(query.status) filter.status = query.status;
        const filterStatusArray = filterHelper.filterStatus(query);
        
        // tìm kiếm theo keyword
        const { keyword, title, slug } = searchHelper.searchKeywordAdvanced(query);
    
        // sắp xếp
        const sortObject = sortHelper.sortQuery(query);
    
        // đếm số lượng sản phẩm (theo các tiêu chí bên trên)
        const quantityRecords = await Role.countDocuments(filter);
    
        // phân trang
        const paginationObject = paginationHelper.pagination(query, quantityRecords);
    
        if(title && slug) {
            filter["$or"] = [ { title }, { slug } ];
        }
    
        const records  = await Role.find(filter)
                                .limit(paginationObject.limit)
                                .skip(paginationObject.skip)
                                .sort(sortObject)
        return {
            records,
            filterStatusArray,
            keyword,
            paginationObject
        }
    }

    // lấy nhóm quyền theo id
    static async findById(role_id) {
        const record = await Role.findOne({_id: role_id, deleted: false});

        return {
            code: 200,
            message: 'Tìm sản phẩm thành công',
            record
        };
    }

    // tạo mới nhóm quyền
    static async create(payload) {
        const record  = new Role(payload);
        await record.save();

        return {
            code: 200,
            message: 'Tạo mới nhóm quyền thành công',
            record
        }
    }

    // chỉnh sửa nhóm quyền
    static async edit(role_id, payload) {
        const record = await Role.updateOne({ _id: role_id}, payload);
        return {
            code: 200,
            message: 'Chỉnh sửa nhóm quyền thành công',
            record
        }
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

    // xóa nhóm quyền
    static async deleteSoft(role_id) {
        const record = await Role.updateOne({_id: role_id}, {deleted: true});
        return {
            code: 200,
            message: 'Xóa nhóm quyền thành công',
            record
        }
    }

}

module.exports = RoleService;