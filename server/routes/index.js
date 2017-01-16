const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: `用户uid后四位为:${req.query.name}的远程`,
    log:'http://192.168.1.38:8888/logs/?&name=' + req.query.name
  });
});

module.exports = router;