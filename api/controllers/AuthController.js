/**
 * AuthController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var passport = require('passport');


var AuthController = {
    /**
     * Simply shows the form login
     */
    login: function (req, res) {
        res.view('auth/login', { error: req.flash('error'), success: req.flash('success') });
    },

    /**
     * Process of the local login
     */
    process: function (req, res, next) {

        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user))
            {
                req.flash('error', info.message || 'Error');
                res.redirect('/login.html');
                return;
            }

            req.logIn(user, function(err)
            {
                if (err)
                {
                    res.redirect('/login.html');
                    return;
                }
                
                res.redirect('/');
                return;
            });
        })(req, res, next);

    },

    signin: function (req, res) {
        res.view('auth/signin', { messages: [], form_data: {} });
    },

    signin_process: function (req, res, next) {

        User.findOne({ username: req.body.username }, function (err, user_by_name) {
            User.findOne({ email: req.body.email }, function (err, user_by_email) {
                var messages = [];

                if (req.body.password !== req.body.password2) {
                    messages.push('user.form.error.password_same');
                } else if(req.body.password.length < 5) {
                    messages.push('user.form.error.password_empty');
                }
                if (req.body.username === '') {
                    messages.push('user.form.error.username_empty');
                }
                if (user_by_name && user_by_name.email !== req.body.email && user_by_name.firstConnection) {
                    messages.push('user.form.error.username_exists');

                }
                if (req.body.email === '') {
                    messages.push('user.form.error.email_empty');

                } else if (!user_by_email) {
                    messages.push('user.form.error.cant_register');

                } else if (user_by_email.firstConnection) {
                    messages.push('user.form.error.already_register');
                }

                if (messages.length === 0) {
                    // Then register the user !
                    user_by_email.username        = req.body.username;
                    user_by_email.firstname       = req.body.firstname;
                    user_by_email.lastname        = req.body.lastname;
                    user_by_email.password        = req.body.password;
                    user_by_email.firstConnection = true;

                    user_by_email.save(function (err) {
                        if (err) return next(err);
                        req.flash('success', 'user.form.success.signin');
                        return res.redirect('/login.html');
                    });
                } else {
                    res.view('auth/signin', { messages: messages, form_data: req.body });
                }
            });
        });
    },

    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    }
};


module.exports = AuthController;