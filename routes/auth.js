var express = require('express');
var UserModel = require('../models/UserModel');

exports.auth = function(req, res, next) {
  var user = new UserModel();
  if (user.find(req.session.uid))
    next();
  else {
    if (req.param('ciao')) {
      req.session.msg = "You have been logged out successfully.";
    }
    else if (!req.session.msg) {
      req.session.msg = "You aren't logged in.";
    }
    res.redirect('/login');
  }
};
