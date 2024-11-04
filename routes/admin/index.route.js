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

// exports
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.PATH_ADMIN;

    app.use(
        PATH_ADMIN + '/dashboard', 
        dashboardRoute    
    );

    app.use(
        PATH_ADMIN + '/products',
        productsRoute
    );

    app.use(
        PATH_ADMIN + '/products-category',
        productCategoryRoute
    );

    app.use(
        PATH_ADMIN + '/accounts',
        accountRoute
    );
}



