var users = require('./users.json');

function UserModel() {
  var _users = [];
  for (var i = 0; i < users.length; i++)
    _users.push(users[i]);
  this.getUsers = function() {
    return _users;
  }
}

UserModel.prototype.find = function(id) {
  var _users = this.getUsers();
  return _users.filter(function(v) {
    return v._id === id && id;
  }).length;
};

UserModel.prototype.getId = function(uname) {
  var _users = this.getUsers();
  var uA = _users.filter(function(v) {
    return v.uname === uname && v;
  });
  if (uA.length === 1)
    return uA[0]._id;
  else
    return false;
};

module.exports = UserModel;
