const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
const app = express();
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  console.log(`test auto deployed`)
});

module.exports = app