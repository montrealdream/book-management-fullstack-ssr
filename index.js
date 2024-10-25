const express = require('express');
const database = require("./config/database.config");
require('dotenv').config();
const routerClient = require('./routes/admin/index.route');

// configuration default
const app = express();
const port = process.env.PORT;

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