const express = require('express');
require('dotenv').config();
const routerClient = require('./routes/admin/index.route');

// configuration default
const app = express();
const port = process.env.PORT;

// router
routerClient(app);

app.listen(port, () => {
  console.log(`Dự án Quản Lý Sách`);
})