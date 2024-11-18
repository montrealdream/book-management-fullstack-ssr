/**
 * @description Controller Admin Setting (Cài đặt)
 * @author GIANG TRƯỜNG
*/

const SettingGeneral = require('../../models/setting-general.modal');

// [GET] /admin/setting/general
module.exports.generalUI = async (req, res) => {
    try {
        const record = await SettingGeneral.findOne({});

        res.render('admin/pages/settings/general', {
            title: 'Cài đặt chung',
            record
        });
    }
    catch(error) {
        console.log('Lỗi giao diện trang cài đặt chung', error);
    }
}

// [POST] /admin/setting/general
module.exports.general = async (req, res) => {
    try {
        const record = await SettingGeneral.findOne({});

        if(record) {
            await SettingGeneral.updateOne(
                {},
                req.body
            );
        }

        else {
            const newRecord = SettingGeneral(req.body);
            await newRecord.save();
        }

        req.flash('success', 'Thay đổi cài đặt chung thành công !');
        res.redirect('back');
    }
    catch(error) {
        console.log('Lỗi tính năng cài đặt chung', error);
    }
}