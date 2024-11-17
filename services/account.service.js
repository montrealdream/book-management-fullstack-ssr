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
    // lấy danh sách tài khoản quản trị
    static async getListAccount(query) {
        const findObject = {
            deleted: false
        }

        // bộ lọc trạng thái
        if(query.status) findObject.status = query.status;
        const filterStatusArray = filterHelper.filterStatus(query);

        // tính năng tìm kiếm theo keyword
        let keyword = "";
        const searchObject = searchHelper.searchKeyword(query);
        if(searchObject.keywordRegex !== "")
            findObject.fullName = searchObject.keywordRegex;

        // đếm số lượng sản phẩm (theo các tiêu chí bên trên)
        const quantityRecords = await Account.countDocuments(findObject);

        // sắp xếp
        const sortObject = sortHelper.sortQuery(query);

        // phân trang
        const paginationObject = paginationHelper.pagination(query, quantityRecords);

        // tìm kiếm database
        const records  = await Account.find(findObject)
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

    // thay đổi trạng thái tài khoản quản trị
    static async changeStatus(account_id, status) {
        // cập nhật trạng thái
        await Account.updateOne(
            {
                _id: account_id
            },
            {
                status: status
            }
        );
    }

    // xóa mềm tài khoản quản trị
    static async deleteSoft(account_id) {
        // xóa mềm
        await Account.updateOne(
            {
                _id: account_id
            }, {
                deleted: true
            }
        );
    }

    // tạo mới tài khoản quản trị
    static async create(body) {
        // upload một ảnh vào thư mục local
        // req.body[req.file.fieldname] = `/uploads/${req.file.filename}`;

        // upload nhiều ảnh vào thư mục local
        // req.body[req.files[0].fieldname] = req.files.map(item => `/uploads/${item.filename}`);

        // check xem email đã tồn tại chưa
        const emailExits = await Account.findOne({
            email: body.email
        });

        if(emailExits) {
            return {
                status: true,
                message: 'Tạo tài khoản thất bại'
            }
        }

        // tạo token cho tài khoản, cộng thêm date.now() cho nó tạo ra unique an toàn
        body["token"] = generateHelper.randomString(30) + Date.now();

        // mã hóa password
        body.password = await bcrypt.hash(body.password, saltRounds);

        // tạo bản ghi mới và lưu vào db
        const record  = new Account(body);
        await record.save();

        return {
            status: true,
            message: 'Tạo tài khoản thành công'
        }
    }

    // lấy tài khoản quản trị theo id
    static async getAccountById(account_id) {
        // tìm kiếm database, không lấy password vì nếu cập nhật mật khẩu mới thì sẽ tự gõ vào
        const record = await Account.findOne({_id: account_id})
                            .select("-password");

        return record;
    }

    // chỉnh sửa tài khoản quản trị
    static async edit(account_id, body) {
        // check xem email đang cập nhật có bị trùng lặp không
        const isEmailExits = await Account.findOne({
            _id: {$ne: account_id}, // không xét theo tài khoản của chính mình
            email: body.email
        })

        // nếu email này đã được người dùng khác sử dụng thì không cập nhật
        if(isEmailExits) {
            return {
                status: true,
                message: 'Chỉnh sửa tài khoản thất bại'
            }
        }

        // nếu không cập nhật mật khẩu thì mật khẩu sẽ trống, vậy để tránh cập nhật sai thì chỉ cần xóa nó
        if(body.password === "")
            delete body['password'];
        
        // nếu trường password không trống thì mã hóa mật khẩu mới
        else {
            body.password = await bcrypt.hash(body.password, saltRounds);
        }

        await Account.updateOne(
            {
                _id: account_id
            }, 
            body
        )

        return {
            status: true,
            message: 'Chỉnh sửa tài khoản thành công'
        }
    }
}

module.exports = AccountService;