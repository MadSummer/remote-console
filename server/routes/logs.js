const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  let name = req.query.name;
  res.sendfile('./server/logs/' + name + '.log');
});

module.exports = router;