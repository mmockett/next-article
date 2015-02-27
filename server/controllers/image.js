/*global fetch, process*/
'use strict';

var fetchres = require('fetchres');

module.exports = function(req, res, next) {
	fetch('http://api.ft.com/content/' + req.params.id, {
		headers: {
			'X-Api-Key': process.env.api2key
		}
	})
	.then(fetchres.json)
	.then(function(image) {
		return fetch(image.members[0].id, {
				headers: {
					'X-Api-Key': process.env.api2key
				}
			})
			.then(fetchres.json);
	})
	.then(function(image) {
		res.redirect('http://com.ft.imagepublish.prod.s3.amazonaws.com/' + image.identifiers[0].identifierValue);
	})
	.catch(function(err) {
		if (err instanceof fetchres.BadServerResponseError) {
			res.status(404).end();
		} else {
			throw err;
		}
	})
	.catch(next);
};