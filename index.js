const express = require('express');
const path = require('path');
const database = require('./databases/connect.database');
require('dotenv').config();
const methodOverride = require('method-override');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const systemConfig = require('./config/system.config');
const bodyParser = require('body-parser');
const routerAdmin = require('./routes/admin/index.route');
const moment = require('moment');
const routerClient = require('./routes/client/index.route');

// configuration default
const app = express();
const port = process.env.DEV_APP_PORT;

app.locals.moment = moment;
app.locals.path_admin = systemConfig.PATH_ADMIN; // app locals

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// express flash
app.use(cookieParser('qudjbhajhfb6868habdahdb3274237847'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// template engines
app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));  // static files
database.connect(); // kết nối database

// tiny-mce
app.use(
  '/tinymce',
   express.static(path.join(__dirname, 'node_modules', 'tinymce'))
);

// router
routerAdmin(app);
routerClient(app);

app.listen(port, () => {
  console.log(`Dự án Quản Lý Sách`);
})