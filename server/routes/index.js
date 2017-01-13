const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: '请选择环境以及房间号'
  });
});

module.exports = router;