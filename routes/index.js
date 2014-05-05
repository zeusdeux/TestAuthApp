var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');
var auth = require('./auth').auth;

/* GET home page. */
router.get('/', auth, function(req, res) {
  res.redirect('/search');
});

router.get('/logout', function(req, res, next) {
  req.session.destroy(function() {
    res.redirect('/?ciao=1');
  });
});

module.exports = router;
