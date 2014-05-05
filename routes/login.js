var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');
var crypto = require('crypto');

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
  var userObj;
  if (uid) {
    userObj = user.find(uid);
    var inputPassHash = crypto.createHmac('sha1', new Buffer(userObj.salt,'base64')).update(req.param('passwd')).digest('base64');
    if (userObj.hash === inputPassHash) {
      req.session.regenerate(function() {
        req.session.uid = uid;
        res.redirect('/');
      });
    }
    else {
      res.redirect('/');
    }
  }
  else {
    res.redirect('/');
  }
});

module.exports = router;
