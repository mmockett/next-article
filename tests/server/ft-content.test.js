/*global it*/
"use strict";
var cheerio = require('cheerio');
var expect = require('chai').expect;
var ftContentTransform = require('../../server/transforms/ft-content');

it('should turn capi v2 ft-content links into a tags', function() {
	var $ = cheerio.load('<ft-content title="Wolfgang Münchau: Draghi’s QE is an imperfect compromise " type="http://www.ft.com/ontology/content/Article" url="http://api.ft.com/content/f203bf76-a241-11e4-bbb8-00144feab7de">aunched a programme of quantitative easing to </ft-content>');
	$('ft-content').replaceWith(ftContentTransform);
	expect($.html()).to.equal('<a href="/f203bf76-a241-11e4-bbb8-00144feab7de">aunched a programme of quantitative easing to </a>');
});

it('should turn capi v2 ft-content links with pretty content into pretty links', function() {
	var $ = cheerio.load('<ft-content title="Wolfgang Münchau: Draghi’s QE is an imperfect compromise " type="http://www.ft.com/ontology/content/Article" url="http://api.ft.com/content/f203bf76-a241-11e4-bbb8-00144feab7de">aunched a programme of <b>quantitative</b> easing to </ft-content>');
	$('ft-content').replaceWith(ftContentTransform);
	expect($.html()).to.equal('<a href="/f203bf76-a241-11e4-bbb8-00144feab7de">aunched a programme of <b>quantitative</b> easing to </a>');
});