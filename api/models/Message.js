/**
 * Message
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        message: {
            type: 'string',
            required: true
        },

        room: {
            type: 'string',
            required: true
        },

        user: {
            type: 'string',
            required: true
        }
    }
};
