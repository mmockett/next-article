/* global describe, it */
'use strict';

const transform = require('./transform-helper');
require('chai').should();

describe('Pull Quotes', function () {

	it('should turn capi v2 pull-quotes into quotes', () => {
		return transform(
				'<body>' +
					'<pull-quote>' +
						'<pull-quote-text>Think left and think right and think low and think high. Oh, the thinks you can think up if only you try!</pull-quote-text>' +
						'<pull-quote-source>Dr. Seuss</pull-quote-source>' +
					'</pull-quote>' +
				'</body>'
			)
			.then(transformedXml => {
				transformedXml.should.equal(
					'<blockquote class="n-content-pullquote">' +
						'<div class="n-content-pullquote__content">' +
							'<p>Think left and think right and think low and think high. Oh, the thinks you can think up if only you try!</p>' +
							'<footer class="n-content-pullquote__footer">Dr. Seuss</footer>' +
						'</div>' +
					'</blockquote>\n'
				);
			});
	});

	it('should not include citation if non available', () => {
		return transform(
				'<body>' +
					'<pull-quote>' +
						'<pull-quote-text>Think left and think right and think low and think high. Oh, the thinks you can think up if only you try!</pull-quote-text>' +
						'<pull-quote-source></pull-quote-source>' +
					'</pull-quote>' +
				'</body>'
			)
			.then(transformedXml => {
				transformedXml.should.equal(
					'<blockquote class="n-content-pullquote">' +
						'<div class="n-content-pullquote__content">' +
							'<p>Think left and think right and think low and think high. Oh, the thinks you can think up if only you try!</p>' +
						'</div>' +
					'</blockquote>\n'
				);
			});
	});

	it('should include an image if one was supplied', () => {
		return transform(
			'<body>' +
				'<pull-quote><pull-quote-text><p>Quote with master image</p></pull-quote-text>' +
					'<pull-quote-image><img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/aa4eec2e-1bfd-11e5-8201-cbdb03d71480" alt="Housing market economic dashboard" longdesc="" width="2048" height="1152" /></pull-quote-image>' +
					'<pull-quote-source>Source with image</pull-quote-source>' +
				'</pull-quote>' +
			'</body>'
		)
		.then(transformedXml => {
			transformedXml.should.equal(
				'<blockquote class="n-content-pullquote n-content-pullquote--with-image">' +
					'<div class="n-content-pullquote__content">' +
						'<p>Quote with master image</p>' +
						'<footer class="n-content-pullquote__footer">Source with image</footer>' +
					'</div>' +
					'<img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/aa4eec2e-1bfd-11e5-8201-cbdb03d71480" alt="Housing market economic dashboard" longdesc="" width="2048" height="1152">' +
				'</blockquote>\n'
			);
		});
	});

});
