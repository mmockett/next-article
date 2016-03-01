/* global describe, it */
'use strict';

const transform = require('./transform-helper');
require('chai').should();

describe('Related Box', () => {

	it('should put in the appropriate mark up for a related box that is not an article with existing mark up - no title', () => {
		return transform(
			'<ft-related url="https://live.ft.com/Events/2015/FT-Property-Summit-2015">' +
				'<media><img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/aa4eec2e-1bfd-11e5-8201-cbdb03d71480" alt="Housing market economic dashboard" longdesc="" width="2048" height="1152" /></media>' +
				'<headline>9th Annual Property Summit</headline>' +
				'<intro><p>The Financial Times is delighted to present the 9th annual <strong>FT Property Summit</strong></p>' +
				'<p>This will bring together global investors, occupiers, lenders and developers to explore the opportunities available in the UK commercial property market</p></intro>' +
			'</ft-related>'
		)
		.then(transformedXml => {
			transformedXml.should.equal(
				'<aside class="n-content-related-box" role="complementary">' +
					'<div class="n-content-related-box__headline"><a class="n-content-related-box__headline-link" href="https://live.ft.com/Events/2015/FT-Property-Summit-2015">9th Annual Property Summit</a></div>' +
					'<a class="n-content-related-box__image-link" href="https://live.ft.com/Events/2015/FT-Property-Summit-2015">' +
					'<img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/aa4eec2e-1bfd-11e5-8201-cbdb03d71480" alt="Housing market economic dashboard" longdesc="" width="2048" height="1152"></a>' +
					'<div class="n-content-related-box__content"><p>The Financial Times is delighted to present the 9th annual <strong>FT Property Summit</strong></p>' +
					'<p>This will bring together global investors, occupiers, lenders and developers to explore the opportunities available in the UK commercial property market</p></div>' +
				'</aside>\n'
			);
		});
	});

	it('should put in the appropriate mark up for a related box that is not an article with existing mark up - no url', () => {
		return transform(
			'<ft-related>' +
				'<media><img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/aa4eec2e-1bfd-11e5-8201-cbdb03d71480" alt="Housing market economic dashboard" longdesc="" width="2048" height="1152" /></media>' +
				'<headline>9th Annual Property Summit</headline>' +
				'<intro><p>The Financial Times is delighted to present the 9th annual <strong>FT Property Summit</strong></p>' +
				'<p>This will bring together global investors, occupiers, lenders and developers to explore the opportunities available in the UK commercial property market</p></intro>' +
			'</ft-related>'
		)
		.then(transformedXml => {
			transformedXml.should.equal(
				'<aside class="n-content-related-box" role="complementary">' +
					'<div class="n-content-related-box__headline">9th Annual Property Summit</div>' +
					'<img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/aa4eec2e-1bfd-11e5-8201-cbdb03d71480" alt="Housing market economic dashboard" longdesc="" width="2048" height="1152">' +
					'<div class="n-content-related-box__content"><p>The Financial Times is delighted to present the 9th annual <strong>FT Property Summit</strong></p>' +
					'<p>This will bring together global investors, occupiers, lenders and developers to explore the opportunities available in the UK commercial property market</p></div>' +
				'</aside>\n'
			);
		});
	});

	it('should put in the appropriate mark up for a related box that is not an article with existing mark up - with title', () => {
		return transform(
			'<ft-related url="https://live.ft.com/Events/2015/FT-Property-Summit-2015">' +
				'<media><img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/aa4eec2e-1bfd-11e5-8201-cbdb03d71480" alt="Housing market economic dashboard" longdesc="" width="2048" height="1152" /></media>' +
				'<title>FT Property Summit 2015</title>' +
				'<headline>9th Annual Property Summit</headline>' +
				'<intro><p>The Financial Times is delighted to present the 9th annual <strong>FT Property Summit</strong></p>' +
				'<p>This will bring together global investors, occupiers, lenders and developers to explore the opportunities available in the UK commercial property market</p></intro>' +
			'</ft-related>'
		)
		.then(transformedXml => {
			transformedXml.should.equal(
				'<aside class="n-content-related-box" role="complementary">' +
					'<h3 class="n-content-related-box__title"><span class="n-content-related-box__title-text">FT Property Summit 2015</span></h3>' +
					'<div class="n-content-related-box__headline"><a class="n-content-related-box__headline-link" href="https://live.ft.com/Events/2015/FT-Property-Summit-2015">9th Annual Property Summit</a></div>' +
					'<a class="n-content-related-box__image-link" href="https://live.ft.com/Events/2015/FT-Property-Summit-2015">' +
					'<img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/aa4eec2e-1bfd-11e5-8201-cbdb03d71480" alt="Housing market economic dashboard" longdesc="" width="2048" height="1152"></a>' +
					'<div class="n-content-related-box__content"><p>The Financial Times is delighted to present the 9th annual <strong>FT Property Summit</strong></p>' +
					'<p>This will bring together global investors, occupiers, lenders and developers to explore the opportunities available in the UK commercial property market</p></div>' +
				'</aside>\n'
			);
		});
	});

	it('should put in the appropriate mark up for a related box that is not an article with existing mark up - with title - small image', () => {
		return transform(
			'<ft-related url="https://live.ft.com/Events/2015/FT-Property-Summit-2015">' +
				'<media><img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/aa4eec2e-1bfd-11e5-8201-cbdb03d71480" alt="Housing market economic dashboard" longdesc="" width="167" height="96" /></media>' +
				'<title>FT Property Summit 2015</title>' +
				'<headline>9th Annual Property Summit</headline>' +
				'<intro><p>The Financial Times is delighted to present the 9th annual <strong>FT Property Summit</strong></p>' +
				'<p>This will bring together global investors, occupiers, lenders and developers to explore the opportunities available in the UK commercial property market</p></intro>' +
			'</ft-related>'
		)
		.then(transformedXml => {
			transformedXml.should.equal(
				'<aside class="n-content-related-box" role="complementary">' +
					'<h3 class="n-content-related-box__title"><span class="n-content-related-box__title-text">FT Property Summit 2015</span></h3>' +
					'<div class="n-content-related-box__headline"><a class="n-content-related-box__headline-link" href="https://live.ft.com/Events/2015/FT-Property-Summit-2015">9th Annual Property Summit</a></div>' +
					'<a class="n-content-related-box__image-link" href="https://live.ft.com/Events/2015/FT-Property-Summit-2015">' +
					'<img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/aa4eec2e-1bfd-11e5-8201-cbdb03d71480" alt="Housing market economic dashboard" longdesc="" width="167" height="96"></a>' +
					'<div class="n-content-related-box__content"><p>The Financial Times is delighted to present the 9th annual <strong>FT Property Summit</strong></p>' +
					'<p>This will bring together global investors, occupiers, lenders and developers to explore the opportunities available in the UK commercial property market</p></div>' +
				'</aside>\n'
			);
		});
	});

	it('should add the appropriate mark up for a related box that is an article with without a title', () => {
		return transform(
			'<ft-related type="http://www.ft.com/ontology/content/Article" url="http://api.ft.com/content/e539eab8-8c83-11e5-8be4-3506bf20cc2b">' +
				'<media><img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/aa4eec2e-1bfd-11e5-8201-cbdb03d71480" alt="Housing market economic dashboard" longdesc="" width="2048" height="1152" /></media>' +
				'<headline>9th Annual Property Summit</headline>' +
				'<intro><p>The Financial Times is delighted to present the 9th annual <strong>FT Property Summit</strong></p>' +
				'<p>This will bring together global investors, occupiers, lenders and developers to explore the opportunities available in the UK commercial property market</p></intro>' +
			'</ft-related>'
		)
		.then(transformedXml => {
			transformedXml.should.equal(
				'<aside class="n-content-related-box" role="complementary">' +
						'<h3 class="n-content-related-box__title"><span class="n-content-related-box__title-text">Related article</span></h3>' +
						'<a class="n-content-related-box__image-link" href="/content/e539eab8-8c83-11e5-8be4-3506bf20cc2b">' +
						'<img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/aa4eec2e-1bfd-11e5-8201-cbdb03d71480" alt="Housing market economic dashboard" longdesc="" width="2048" height="1152"></a>' +
						'<div class="n-content-related-box__headline"><a class="n-content-related-box__headline-link" href="/content/e539eab8-8c83-11e5-8be4-3506bf20cc2b">9th Annual Property Summit</a></div>' +
						'<div class="n-content-related-box__content"><p>The Financial Times is delighted to present the 9th annual <strong>FT Property Summit</strong></p>' +
						'<p>This will bring together global investors, occupiers, lenders and developers to explore the opportunities available in the UK commercial property market</p></div>' +
				'</aside>\n'
			);
		});
	});

	it('should add the appropriate mark up for a related box that is an article with with a title', () => {
		return transform(
			'<ft-related type="http://www.ft.com/ontology/content/Article" url="http://api.ft.com/content/e539eab8-8c83-11e5-8be4-3506bf20cc2b">' +
				'<title>Bridge the generation gap</title>' +
				'<headline>9th Annual Property Summit</headline>' +
				'<media><img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/aa4eec2e-1bfd-11e5-8201-cbdb03d71480" alt="Housing market economic dashboard" longdesc="" width="2048" height="1152" /></media>' +
				'<intro><p>The Financial Times is delighted to present the 9th annual <strong>FT Property Summit</strong></p>' +
				'<p>This will bring together global investors, occupiers, lenders and developers to explore the opportunities available in the UK commercial property market</p></intro>' +
			'</ft-related>'
		)
		.then(transformedXml => {
			transformedXml.should.equal(
				'<aside class="n-content-related-box" role="complementary">' +
					'<h3 class="n-content-related-box__title"><span class="n-content-related-box__title-text">Bridge the generation gap</span></h3>' +
					'<a class="n-content-related-box__image-link" href="/content/e539eab8-8c83-11e5-8be4-3506bf20cc2b">' +
					'<img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/aa4eec2e-1bfd-11e5-8201-cbdb03d71480" alt="Housing market economic dashboard" longdesc="" width="2048" height="1152"></a>' +
					'<div class="n-content-related-box__headline"><a class="n-content-related-box__headline-link" href="/content/e539eab8-8c83-11e5-8be4-3506bf20cc2b">9th Annual Property Summit</a></div>' +
					'<div class="n-content-related-box__content"><p>The Financial Times is delighted to present the 9th annual <strong>FT Property Summit</strong></p>' +
					'<p>This will bring together global investors, occupiers, lenders and developers to explore the opportunities available in the UK commercial property market</p></div>' +
				'</aside>\n'
			);
		});
	});


});
