var express = require('express');
var router = express.Router();
var TestModel = require('../models/TestModel');
var auth = require('./auth').auth;

/* GET test query page. */
router.get('/', auth, function(req, res) {
  res.render('search', {results: undefined, q: ''});
});

router.post('/', auth, function(req, res){
	var model = new TestModel();
	var results = model.find(req.param('q'));
	res.render('search',{results: results, q: req.param('q')});
});


module.exports = router;
