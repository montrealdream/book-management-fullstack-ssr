/**
 * @description Router Client
 * @param   app
 * @author GIANG TRƯỜNG
 */

// Route
const homeRoute = require('./home.route');

// exports
module.exports = (app) => {
    app.use(
        '/',
        homeRoute
    );
}