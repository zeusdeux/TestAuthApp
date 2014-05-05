var data = require('./data.json');

function TestModel() {
  this.name = [];
  this.name.qualifiedName = "name";
  this.company = [];
  this.company.qualifiedName = "company";
  for (var i = 0; i < data.length; i++) {
    this.name.push(data[i].name);
    this.company.push(data[i].company);
  }
}

TestModel.prototype.find = function(keyword) {
  var self = this;
  var response = [];
  var mapFn = function(v, i, a) {
    if (keyword === v){
      var temp = {};
      temp[a.qualifiedName] = v;
      temp[this.qualifiedName] = this[i];
      return temp;
    }
  };

  response = response.concat(this.name.map(mapFn, this.company));
  response = response.concat(this.company.map(mapFn, this.name));

  //filter out "undefined"s which exist as in mapFn when 
  //keyword !== v we implicitly return undefined (like any other js func)
  response = response.filter(function(v) { return v !== undefined && v; });

  return response;
};

module.exports = TestModel;
