const User = require('../models/user');
module.exports.profile = function (req, res) {
    return res.render('profile', {
        title: "Pankaj Kumar"
    });
}

// render sign up page
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: 'codeial | Sign Up'
    });
}

// render sign in
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: 'codeial | Sign In'
    })
}

// get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        console.log('password do not match');
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in finding user on sign up', err); return}
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('error in creating user while sign up', err);
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }
        else { 
            return res.redirect('back');
        }
    })
}

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    
}