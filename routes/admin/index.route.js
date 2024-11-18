/**
 * @description Router Admin (Trang Quản Trị)
 * @param   app
 * @author GIANG TRƯỜNG
 */

const systemConfig = require("../../config/system.config");
const dashboardRoute = require("./dashboard.route");
const productsRoute  = require('./product.route');
const productCategoryRoute = require('./product-category.route');
const accountRoute = require('./accounts.route');
const roleRoute = require('./role.route.js');
const authRoute = require('./auth.route.js');
const settingRoute = require('./setting.route.js');

const authenMiddleware = require('../../middleware/auth.middleware.js');

// exports
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.PATH_ADMIN;

    app.use(
        PATH_ADMIN + '/dashboard', 
        authenMiddleware.requireAuth,
        dashboardRoute    
    );

    app.use(
        PATH_ADMIN + '/products',
        authenMiddleware.requireAuth,
        productsRoute
    );

    app.use(
        PATH_ADMIN + '/products-category',
        authenMiddleware.requireAuth,
        productCategoryRoute
    );

    app.use(
        PATH_ADMIN + '/accounts',
        authenMiddleware.requireAuth,
        accountRoute
    );

    app.use(
        PATH_ADMIN + '/roles',
        authenMiddleware.requireAuth,
        roleRoute
    );

    app.use(
        PATH_ADMIN + '/setting',
        authenMiddleware.requireAuth,
        settingRoute
    )

    // trang đăng nhập thì không cần private router
    app.use(
        PATH_ADMIN + '/auth',
        authRoute
    );
}



