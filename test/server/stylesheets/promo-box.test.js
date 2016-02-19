/* global describe, it */

'use strict';

var transform = require('./transform-helper');
require('chai').should();

describe('Promo-boxes', function() {

	it('should transform a promo box to a related box', function() {
		return transform(
			'<promo-box>' +
				'<promo-title><p>Tatomer Riesling 2012</p></promo-title>' +
				'<promo-headline><p>Greece debt crisis</p></promo-headline>' +
				'<promo-image><img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/1871b094-3b7d-11e5-bbd1-b37bc06f590c" /></promo-image>' +
				'<promo-intro><p>Graham Tatomer worked at Austrian Riesling producer Emmerich Knoll and now fashions this example from the old vines of the Kick-on Ranch in Santa Barbara (£26.95, Roberson)</p></promo-intro>' +
			'</promo-box>'
		)
		.then(function (transformedXml) {
			transformedXml.should.equal(
				'<aside class="n-content-related-box" role="complementary">' +
					'<h3 class="n-content-related-box__title"><span class="n-content-related-box__title-text">Tatomer Riesling 2012</span></h3>' +
					'<div class="n-content-related-box__headline">Greece debt crisis</div>' +
					'<img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/1871b094-3b7d-11e5-bbd1-b37bc06f590c">' +
					'<div class="n-content-related-box__content">' +
						'<p>Graham Tatomer worked at Austrian Riesling producer Emmerich Knoll and now fashions this example from the old vines of the Kick-on Ranch in Santa Barbara (£26.95, Roberson)</p>' +
					'</div>' +
				'</aside>\n'
			);
		});
	});

	it('should not output a default title if no title provided', function () {
		return transform(
			'<promo-box>' +
				'<promo-headline><p>Greece debt crisis</p></promo-headline>' +
				'<promo-image><img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/1871b094-3b7d-11e5-bbd1-b37bc06f590c" /></promo-image>' +
				'<promo-intro><p>Graham Tatomer worked at Austrian Riesling producer Emmerich Knoll and now fashions this example from the old vines of the Kick-on Ranch in Santa Barbara (£26.95, Roberson)</p></promo-intro>' +
			'</promo-box>'
		)
		.then(function (transformedXml) {
			transformedXml.should.equal(
				'<aside class="n-content-related-box" role="complementary">' +
					'<div class="n-content-related-box__headline">Greece debt crisis</div>' +
					'<img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/1871b094-3b7d-11e5-bbd1-b37bc06f590c">' +
					'<div class="n-content-related-box__content">' +
						'<p>Graham Tatomer worked at Austrian Riesling producer Emmerich Knoll and now fashions this example from the old vines of the Kick-on Ranch in Santa Barbara (£26.95, Roberson)</p>' +
					'</div>' +
				'</aside>\n'
			);
		});
	});

	it('should leave in any HTML in title (except wrapped p tag)', function () {
		return transform(
			'<promo-box>' +
				'<promo-title><p><a href="/c9175806-3054-11e5-8873-775ba7c2ea3d">Greece crisis tests start-ups’ staying power</a> </p></promo-title>' +
			'</promo-box>'
		)
		.then(function(transformedXml) {
			transformedXml.should.equal(
				'<aside class="n-content-related-box" role="complementary">' +
					'<h3 class="n-content-related-box__title"><span class="n-content-related-box__title-text"><a href="/c9175806-3054-11e5-8873-775ba7c2ea3d">Greece crisis tests start-ups’ staying power</a> </span></h3>' +
				'</aside>\n'
			);
		});
	});

	it('should leave in any HTML in headline (except wrapped p tag)', function () {
		return transform(
			'<promo-box>' +
				'<promo-headline><p><a href="/c9175806-3054-11e5-8873-775ba7c2ea3d">Greece crisis tests start-ups’ staying power</a></p></promo-headline>' +
			'</promo-box>'
		)
		.then(function(transformedXml) {
			transformedXml.should.equal(
				'<aside class="n-content-related-box" role="complementary">' +
					'<div class="n-content-related-box__headline"><a href="/c9175806-3054-11e5-8873-775ba7c2ea3d">Greece crisis tests start-ups’ staying power</a></div>' +
				'</aside>\n'
			);
		});
	});

	it('should handle two promoboxes with different attributes in the same xml', function() {
		return transform(
			'<promo-box>' +
				'<promo-title><p>Tatomer Riesling 2012</p></promo-title>' +
				'<promo-headline><p>Greece debt crisis</p></promo-headline>' +
				'<promo-image><img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/1871b094-3b7d-11e5-bbd1-b37bc06f590c" /></promo-image>' +
				'<promo-intro><p><strong>Breakthrough:</strong> “Closing our first seed round in 10 days three times oversubscribed gave us momentum [to carry through] to the execution of our strategy and into the IPO.”</p>' +
				'<p><strong>Best mentor:</strong> “Chris Baohm, my boss at Gresham Partners in Australia . . . made me understand the importance of breaking down complex situations into the core commercial objectives.”</p>' +
				'<p><strong>Biggest mistake:</strong> “It became very clear that we needed a strong team with us who we could trust to navigate the huge due diligence tasks we had in several countries, in a different language.”</p>' +
				'<p><strong>Networking:</strong> “Wherever possible, and especially in Latin America, meet in person. Regardless of how good tech is, a face-to-face meeting is irreplaceable.”</p></promo-intro>' +
			'</promo-box>' +
			'<promo-box>' +
				'<promo-title><p>Tatomer Riesling 2012</p></promo-title>' +
				'<promo-headline><p>Greece debt crisis</p></promo-headline>' +
				'<promo-image><img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/1871b094-3b7d-11e5-bbd1-b37bc06f590c" /></promo-image>' +
				'<promo-intro><p>Graham Tatomer worked at Austrian Riesling producer Emmerich Knoll and now fashions this example from the old vines of the Kick-on Ranch in Santa Barbara (£26.95, Roberson)</p></promo-intro>' +
			'</promo-box>'
		)
		.then(function(transformedXml) {
			transformedXml.should.equal(
				'<aside class="n-content-related-box" role="complementary">' +
					'<h3 class="n-content-related-box__title"><span class="n-content-related-box__title-text">Tatomer Riesling 2012</span></h3>' +
					'<div class="n-content-related-box__headline">Greece debt crisis</div>' +
					'<img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/1871b094-3b7d-11e5-bbd1-b37bc06f590c">' +
					'<div class="n-content-related-box__content">' +
						'<p><strong>Breakthrough:</strong> “Closing our first seed round in 10 days three times oversubscribed gave us momentum [to carry through] to the execution of our strategy and into the IPO.”</p>' +
						'<p><strong>Best mentor:</strong> “Chris Baohm, my boss at Gresham Partners in Australia . . . made me understand the importance of breaking down complex situations into the core commercial objectives.”</p>' +
						'<p><strong>Biggest mistake:</strong> “It became very clear that we needed a strong team with us who we could trust to navigate the huge due diligence tasks we had in several countries, in a different language.”</p>' +
						'<p><strong>Networking:</strong> “Wherever possible, and especially in Latin America, meet in person. Regardless of how good tech is, a face-to-face meeting is irreplaceable.”</p>' +
					'</div>' +
				'</aside>' +
				'<aside class="n-content-related-box" role="complementary">' +
					'<h3 class="n-content-related-box__title"><span class="n-content-related-box__title-text">Tatomer Riesling 2012</span></h3>' +
					'<div class="n-content-related-box__headline">Greece debt crisis</div>' +
					'<img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/1871b094-3b7d-11e5-bbd1-b37bc06f590c">' +
					'<div class="n-content-related-box__content">' +
					'<p>Graham Tatomer worked at Austrian Riesling producer Emmerich Knoll and now fashions this example from the old vines of the Kick-on Ranch in Santa Barbara (£26.95, Roberson)</p></div>' +
				'</aside>\n'
			);
		});
	});

	it('should not strip out text in a headline before a link', function() {
		return transform(
			'<promo-box>' +
				'<promo-title><p>Series: China Great Game</p></promo-title>' +
				'<promo-headline><p>As China seeks to expand its sphere of influence, it is likely to encounter significant resistance. <a href="http://www.ft.com/indepth/china-great-game" title="Chinas Great Game in depth">Read more</a> </p></promo-headline>' +
				'<promo-intro><p><a href="/content/6e098274-587a-11e5-a28b-50226830d644">Road to a new empire </a> <br/>A modern-day Silk route is Xi Jinping’s signature foreign policy. <a href="/content/6e098274-587a-11e5-a28b-50226830d644">Read more </a> </p></promo-intro>' +
			'</promo-box>'
		)
		.then(function(transformedXml) {
			transformedXml.should.equal(
				'<aside class="n-content-related-box" role="complementary">' +
					'<h3 class="n-content-related-box__title"><span class="n-content-related-box__title-text">Series: China Great Game</span></h3>' +
					'<div class="n-content-related-box__headline">As China seeks to expand its sphere of influence, it is likely to encounter significant resistance. <a href="http://www.ft.com/indepth/china-great-game">Read more</a> </div>' +
					'<div class="n-content-related-box__content">' +
						'<p><a href="/content/6e098274-587a-11e5-a28b-50226830d644">Road to a new empire </a> <br>A modern-day Silk route is Xi Jinping’s signature foreign policy. <a href="/content/6e098274-587a-11e5-a28b-50226830d644">Read more </a> </p>' +
					'</div>' +
				'</aside>\n'
			);
		});
	});

	it('should accept a title without <p> element inside it', function() {
		return transform(
			'<promo-box>' +
				'<promo-title><b>CV</b></promo-title>' +
				'<promo-headline><p>This is the headline</p></promo-headline>' +
				'<promo-intro><p>Here is some content</p></promo-intro>' +
			'</promo-box>'
		)
		.then(function(transformedXml) {
			transformedXml.should.equal(
				'<aside class="n-content-related-box" role="complementary">' +
					'<h3 class="n-content-related-box__title"><span class="n-content-related-box__title-text"><b>CV</b></span></h3>' +
					'<div class="n-content-related-box__headline">This is the headline</div>' +
					'<div class="n-content-related-box__content"><p>Here is some content</p></div>' +
				'</aside>\n'
			);
		});
	});

});
