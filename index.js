const express = require('express');
const database = require("./config/database.config");
require('dotenv').config();
const methodOverride = require('method-override');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const routerClient = require('./routes/admin/index.route');

// configuration default
const app = express();
const port = process.env.PORT;

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// express flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// template engines
app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));  // static files
database.connect();                 // database

// router
routerClient(app);

app.listen(port, () => {
  console.log(`Dự án Quản Lý Sách`);
})