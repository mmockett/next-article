'use strict';

const controllerArticle = require('./article');

module.exports = (req, res, next) => {
	return controllerArticle(req, res, next, req.body);
};
