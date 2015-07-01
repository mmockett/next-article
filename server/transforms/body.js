"use strict";

var cheerio = require('cheerio');

var replaceEllipses = require('./replace-ellipses');
var replaceHrs = require('../transforms/replace-hrs');
var relativeLinks = require('./relative-links');
var trimmedLinks = require('./trimmed-links');
var externalImg = require('./external-img');
var removeBody = require('./remove-body');
var promoBox = require('./promo-box');
var subheaders = require('./subheaders');
// combo transforms
var bigNumberCombos = require('./big-number-combos');

var transform = function ($, flags) {
	var withFn = function ($, transformFn) {
		var transformed$ = transformFn($, flags);
		return {
			'with': withFn.bind(withFn, transformed$),
			get: function () {
				return transformed$;
			}
		};
	};
	return {
		'with': withFn.bind(withFn, $)
	};
};

module.exports = function(body, flags) {
	body = replaceEllipses(body);
	body = replaceHrs(body);
	body = body.replace(/<\/a>\s+([,;.:])/mg, '</a>$1');

	var $ = transform(cheerio.load(body, { xmlMode: true }), flags)
		// combo components
		// .with(bigNumberCombos)
		// other transforms
		.with(externalImg)
		.with(promoBox)
		.with(removeBody)
		.with(relativeLinks)
		.with(trimmedLinks)
		// .with(subheaders)
		.get();

	return $;
};
