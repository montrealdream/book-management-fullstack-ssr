/**
 * @description Router Client
 * @param   app
 * @author GIANG TRƯỜNG
 */

// Route
const homeRoute = require('./home.route');
const productRoute = require('./product.route');

// exports
module.exports = (app) => {
    app.use(
        '/',
        homeRoute
    );
    
    app.use(
        '/products',
        productRoute
    );
}