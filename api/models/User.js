/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */


var bcrypt = require('bcrypt');

module.exports = {

    attributes: {

        username:  'string',
        firstname: {
            type:     'string'
        },
        lastname: {
            type:     'string'
        },
        email: {
            type: 'email',
            required: true
        },
        firstConnection: {
            type: 'boolean',
            defaultsTo: false
        },
        password: {
            type: 'string'
        },

        // Check if the password is the
        // same as the one register
        validPassword: function (password) {
            return bcrypt.compareSync(password, this.password);
        },

        // Override toJSON instance method
        // to remove password value
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },


    // Lifecycle Callbacks
    beforeUpdate: function(values, next) {

        // If the password is changed
        if (values.password && values.password != '') {
            bcrypt.hash(values.password, 10, function(err, hash) {
                if (err) {
                    return next(err);
                }
                values.password = hash;
                next();
            });
        } else if (values.id) {
            User
                .findOne(values.id)
                .done(function(err, user) {
                    if (err) {
                        next(err);
                    } else {
                        values.password = user.password;
                        next();
                    }
                });
        } else {
            next();
        }
    }

};
