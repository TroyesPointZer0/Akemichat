/**
 * MainController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var MainController = {
    home: function (req, res) {
        res.view('main/home', { layout: 'main_layout' });
    }
};


module.exports = MainController;