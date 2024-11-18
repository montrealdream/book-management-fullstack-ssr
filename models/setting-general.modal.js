/**
 * @description Model Setting General (Cài đặt chung)
 * @author GIANG TRƯỜNG
*/

const mongoose = require('mongoose');

// schema
const settingGeneralSchema = new mongoose.Schema(
    {
        // lưu ý luôn luôn trong collection chỉ có 1 bản ghi này
        websiteName: { type: String, trim: true, required: true },
        logo: { type: String, required: true },
        email: {type: String, trim: true, required: true },
        tel: { type: String, required: true },
        address: { type: String, required: true},
        copyright: { type: String, required: true}
    },
    {
        timestamps: true
    }
);

// modal
const SettingGeneral = mongoose.model('SettingGeneral', settingGeneralSchema, 'setting-general');

// exports
module.exports = SettingGeneral;