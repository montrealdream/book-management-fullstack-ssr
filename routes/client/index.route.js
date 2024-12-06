/**
 * @description Router Client
 * @param   app
 * @author GIANG TRƯỜNG
 */

// Route
const homeRoute = require('./home.route');
const productRoute = require('./product.route');
const userRoute = require('./user.route');
const searchRoute = require('./search.route');

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

    app.use(
        '/user',
        userRoute
    );

    app.use(
        '/search',
        searchRoute
    );
}