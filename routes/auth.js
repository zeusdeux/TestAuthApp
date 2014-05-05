var express = require('express');
var UserModel = require('../models/UserModel');

exports.auth = function(req, res, next) {
  var user = new UserModel();
  if (user.find(req.session.uid))
    next();
  else {
    res.redirect('/login');
  }
};
