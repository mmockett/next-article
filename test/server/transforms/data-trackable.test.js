/*global describe, it, context*/
'use strict';

var cheerio = require('cheerio');
var dataTrackableTransform = require('../../../server/transforms/data-trackable');
require('chai').should();

describe('Data Trackable Transform', () => {

	it('should add data-trackable attributes to a related content box', () => {
		const $ = cheerio.load(
			'<aside class="n-content-related-box" role="complementary">' +
				'<div class="n-content-related-box__headline"><a class="n-content-related-box__headline-link" href="https://live.ft.com/Events/2015/FT-Property-Summit-2015">9th Annual Property Summit</a></div>' +
				'<a class="n-content-related-box__image-link" href="https://live.ft.com/Events/2015/FT-Property-Summit-2015">' +
				'<img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/aa4eec2e-1bfd-11e5-8201-cbdb03d71480" alt="Housing market economic dashboard" longdesc="" width="2048" height="1152"></a>' +
				'<div class="n-content-related-box__content"><p>The Financial Times is delighted to present the 9th annual <strong>FT Property Summit</strong></p>' +
				'<p>This will bring together global investors, occupiers, lenders and developers to explore the opportunities available in the UK commercial property market</p></div>' +
			'</aside>'
		);
		const transformed$ = dataTrackableTransform($);
		transformed$.html().should.equal(
			'<aside class="n-content-related-box" role="complementary" data-trackable="related-box">' +
				'<div class="n-content-related-box__headline"><a class="n-content-related-box__headline-link" href="https://live.ft.com/Events/2015/FT-Property-Summit-2015" data-trackable="link-headline">9th Annual Property Summit</a></div>' +
				'<a class="n-content-related-box__image-link" href="https://live.ft.com/Events/2015/FT-Property-Summit-2015" data-trackable="link-image">' +
				'<img src="http://com.ft.imagepublish.prod.s3.amazonaws.com/aa4eec2e-1bfd-11e5-8201-cbdb03d71480" alt="Housing market economic dashboard" longdesc="" width="2048" height="1152"></a>' +
				'<div class="n-content-related-box__content"><p>The Financial Times is delighted to present the 9th annual <strong>FT Property Summit</strong></p>' +
				'<p>This will bring together global investors, occupiers, lenders and developers to explore the opportunities available in the UK commercial property market</p></div>' +
			'</aside>'
		);
	});

	it('should add data trackable elements to all links in the article body', () => {
		const $ = cheerio.load(
			'<p><a href="http://www.ft.com/indepth/uk-house-prices" title="UK house prices - in-depth - FT.com">UK house prices</a>' +
			' continue to climb, driven by sharp rises in London and the east of England. However, different house price indices show significant divergence. ' +
			'<a href="http://www.lloydsbankinggroup.com/globalassets/documents/media/press-releases/halifax/2016/housepriceindexjanuary2016.pdf" title="Halifax house price index">Halifax estimates</a>' +
			' that prices rose by 9.7 per cent in January, whereas ' +
			'<a href="http://www.nationwide.co.uk/about/house-price-index/headlines" title="Nationwide house price index">Nationwide</a>' +
			' put the increase at 4.4 per cent. Both indicate prices rising faster than incomes.</p>'
		);
		const transformed$ = dataTrackableTransform($);
		transformed$.html().should.equal(
			'<p><a href="http://www.ft.com/indepth/uk-house-prices" title="UK house prices - in-depth - FT.com" data-trackable="link">UK house prices</a>' +
			' continue to climb, driven by sharp rises in London and the east of England. However, different house price indices show significant divergence. ' +
			'<a href="http://www.lloydsbankinggroup.com/globalassets/documents/media/press-releases/halifax/2016/housepriceindexjanuary2016.pdf" title="Halifax house price index" data-trackable="link">Halifax estimates</a>' +
			' that prices rose by 9.7 per cent in January, whereas ' +
			'<a href="http://www.nationwide.co.uk/about/house-price-index/headlines" title="Nationwide house price index" data-trackable="link">Nationwide</a>' +
			' put the increase at 4.4 per cent. Both indicate prices rising faster than incomes.</p>'
		);
	});

});
