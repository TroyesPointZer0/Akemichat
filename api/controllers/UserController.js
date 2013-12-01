/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var UserController = {
    index: function  (req, res, data) {

        if (!data || typeof(data) !== 'object') {
            data = {error: false, email: ''};
        }
        
        User.find().done(function (err, users) {
            if (err) return res.send(err,500);

            data['users'] = users;
            return res.view('user/index', data);
        });
    },

    create: function (req, res) {
        var self = this;

        User.create({
            email: req.body.user_email
        }).done(function (err) {
            if (err) {
                var data = { error: true, email: req.body.user_email };
                UserController.index(req, res, data);
            } else {
                res.redirect('/admin/user.html');
            }
        });
    },

    /**
    * Overrides for the settings in `config/controllers.js`
    * (specific to UserController)
    */
    _config: {}

};


module.exports = UserController;
