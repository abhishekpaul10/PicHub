var express = require('express');
var router = express.Router();

//to get the homepage

router.get('/', ensureLoggedin, function(req, res) {
    res.render('index');
});

function ensureLoggedin(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/users/login');
    }
}



module.exports = router;