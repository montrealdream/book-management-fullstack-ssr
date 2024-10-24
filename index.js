const express = require('express');
require('dotenv').config();
const routerClient = require('./routes/admin/index.route');

// configuration default
const app = express();
const port = process.env.PORT;

// template engines
app.set('views', './views');
app.set('view engine', 'pug');

// static files
app.use(express.static('public'));

// router
routerClient(app);

app.listen(port, () => {
  console.log(`Dự án Quản Lý Sách`);
})