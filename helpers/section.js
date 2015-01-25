module.exports.register = function (Handlebars, options, params) {
    'use strict';

    // enables {{#section '...'}} tags in templates
    Handlebars.registerHelper('section', function (name, options) {
        if (!this._sections) {
            this._sections = {};
        }
        this._sections[name] = options.fn(this);
        return null;
    });
};