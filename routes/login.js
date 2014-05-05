var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');

router.get('/', function(req, res, next) {
  var user = new UserModel();
  if (user.find(req.session.uid))
    res.redirect('/');
  else {
    res.render('login');
  }
});

router.post('/', function(req, res, next) {
  var user = new UserModel();
  var uid = user.getId(req.param('uname'));

  if (uid) {
    req.session.regenerate(function() {
      req.session.uid = uid;
      console.log("Session: "+req.session.uid);
      res.redirect('/');
    });
  }
  else {
    res.redirect('/login');
  }
});

module.exports = router;