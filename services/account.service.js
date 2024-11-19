/**
 * @description Service Admin Account (Tài khoản quản trị)
 * @author GIANG TRƯỜNG
*/

const Account = require('../models/account.model');

const bcrypt = require('bcrypt');
const saltRounds = 10; // Số vòng lặp, càng cao càng an toàn

const filterHelper = require('../helper/filter.helper');
const searchHelper = require('../helper/search.helper');
const paginationHelper = require('../helper/pagination.helper');
const generateHelper = require('../helper/generate.helper');
const sortHelper = require('../helper/sort.helper');

class AccountService {
    // Tìm danh sách tài khoản quản trị
    static async findAll (query) {
        const filter = { deleted: false }
    
        if(query.status) filter.status = query.status;
        const filterStatusArray = filterHelper.filterStatus(query);
        
        // tìm kiếm theo keyword
        const { keyword, title, slug } = searchHelper.searchKeywordAdvanced(query);
    
        // sắp xếp
        const sortObject = sortHelper.sortQuery(query);
    
        // đếm số lượng sản phẩm (theo các tiêu chí bên trên)
        const quantityRecords = await Account.countDocuments(filter);
    
        // phân trang
        const paginationObject = paginationHelper.pagination(query, quantityRecords);
    
        if(title && slug) {
            filter["$or"] = [ { title }, { slug } ];
        }
    
        const records  = await Account.find(filter)
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

    // lấy tài khoản quản trị theo id
    static async findById(account_id) {
        // tìm kiếm database, không lấy password vì nếu cập nhật mật khẩu mới thì sẽ tự gõ vào
        const record = await Account.findOne({_id: account_id})
                            .select("-password");

        return {
            code: 200,
            message: 'Tìm thành công',
            record
        };
    }

    // tạo mới tài khoản quản trị
    static async create(payload) {
        // check xem email đã tồn tại chưa
        const emailExits = await Account.findOne({email: payload.email});
        if(emailExits) 
            return { code: 400, message: 'Tạo tài khoản thất bại', record : {} }

        // tạo token cho tài khoản, cộng thêm date.now() cho nó tạo ra unique an toàn
        payload["token"] = generateHelper.randomString(30) + Date.now();

        // mã hóa password
        payload.password = await bcrypt.hash(payload.password, saltRounds);

        // tạo bản ghi mới và lưu vào db
        const record  = new Account(payload);
        await record.save();

        return {
            code: 200,
            message: 'Tạo tài khoản thành công',
            record
        }
    }

    // chỉnh sửa tài khoản quản trị
    static async edit(account_id, payload) {
        // check xem email đang cập nhật có bị trùng lặp không
        const isEmailExits = await Account.findOne({
            _id: {$ne: account_id},
            email: payload.email
        })

        // nếu email này đã được người dùng khác sử dụng thì không cập nhật
        if(isEmailExits) return { code: 400, message: 'Chỉnh sửa tài khoản thất bại', record: {} }
            
        // nếu không cập nhật mật khẩu thì mật khẩu sẽ trống, vậy để tránh cập nhật sai thì chỉ cần xóa nó
        if(payload.password === "") delete payload['password'];
            
        // nếu trường password không trống thì mã hóa mật khẩu mới
        else payload.password = await bcrypt.hash(payload.password, saltRounds);

        const record = await Account.updateOne( {_id: account_id}, payload );

        return {
            code: 200,
            message: 'Chỉnh sửa tài khoản thành công',
            record
        }
    }

    // thay đổi trạng thái tài khoản quản trị
    static async changeStatus(account_id, status) {
        const statusValid = ["active", "inactive"];
        if(statusValid.includes(status) === false) return {
            code: 400,
            message: 'Thay đổi trạng thái thất bại',
            record: {}
        }

        const record = await Account.updateOne( {_id: account_id}, { status: status} );

        return {
            code: 200,
            message: 'Chỉnh sửa tài khoản thành công',
            record
        }
    }

    // xóa mềm tài khoản quản trị
    static async deleteSoft(account_id) {
        const record = await Account.updateOne( { _id: account_id}, {deleted: true} );
        return {
            code: 200,
            message: 'Xóa tài khoản thành công',
            record
        }
    }
}

module.exports = AccountService;