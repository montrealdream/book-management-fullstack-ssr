const express = require('express');
const routerClient = require('./routes/admin/index.route');

// configuration default
const app = express();
const port = 3000;

// router
routerClient(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})