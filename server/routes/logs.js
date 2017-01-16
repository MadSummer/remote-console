const express = require('express');
const router = express.Router();
const path = require('path');
/* GET home page. */
router.get('/', (req, res, next) => {
  let name = req.query.name;
  res.sendFile(path.resolve(__dirname, '../' , './logs/'+ name + '.log'));
});

module.exports = router;