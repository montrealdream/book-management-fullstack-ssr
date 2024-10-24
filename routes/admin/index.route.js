/**
 * @description ROUTER ADMIN (TRANG QUẢN TRỊ)
 * @param   app
 * @author GIANG TRƯỜNG
 */

const systemConfig = require("../../config/system.config");

// export
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.PATH_ADMIN;

    app.use(
        PATH_ADMIN + '/', 
        (req, res) => {
            res.send('Hello World!')
    });
}



