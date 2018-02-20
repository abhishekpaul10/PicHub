var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');



//set up schema

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

//bcrypt hash

module.exports.createUser = function(newUser, callBack) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callBack); 
        });
    });
}

module.exports.getUserByUsername = function(username, callBack) {
    var query = {username: username};
    User.findOne(query, callBack);
}

module.exports.getUserById = function(id, callBack) {
    User.findById(id, callBack);
}

module.exports.comparePassword = function(userPassword, hash, callBack) {
    bcrypt.compare(userPassword, hash, function(err, isMatch) {
        if(err) throw err;
        callBack(null, isMatch);
    });
}