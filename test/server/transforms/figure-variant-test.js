/*global describe, context, it*/
'use strict';

var cheerio = require('cheerio');
var externalImagesTransform = require('../../../server/transforms/figure-variant');
require('chai').should();

describe('Figure Variant Transform', () => {

	context('Size variants and max widths', () => {

		it('applies thin variation when source image width is very small', () => {
			const $ = cheerio.load(
				'<figure class="n-content-image">' +
					'<img src="http://my-image/image.jpg" width="100" height="160">' +
				'</figure>'
			);
			const transformed$ = externalImagesTransform($);
			transformed$.html().should.equal(
				'<figure class="n-content-image n-content-image--thin">' +
					'<img src="http://my-image/image.jpg" width="100" height="160">' +
				'</figure>'
			);
		});

		it('applies inline variation when source image is small', () => {
			const $ = cheerio.load(
				'<figure class="n-content-image">' +
					'<img src="http://my-image/image.jpg" width="320" height="240">' +
				'</figure>'
			);
			const transformed$ = externalImagesTransform($);
			transformed$.html().should.equal(
				'<figure class="n-content-image n-content-image--inline">' +
					'<img src="http://my-image/image.jpg" width="320" height="240">' +
				'</figure>'
			);
		});

		it('applies center variation when source image is neither small nor large', () => {
			const $ = cheerio.load(
				'<figure class="n-content-image">' +
					'<img src="http://my-image/image.jpg" width="640" height="480">' +
				'</figure>'
			);
			const transformed$ = externalImagesTransform($);
			transformed$.html().should.equal(
				'<figure class="n-content-image n-content-image--center">' +
					'<img src="http://my-image/image.jpg" width="640" height="480">' +
				'</figure>'
			);
		});

		it('applies full width, maximum size variation when source image is large', () => {
			const $ = cheerio.load(
				'<figure class="n-content-image">' +
					'<img src="http://my-image/image.jpg" width="1600" height="960">' +
				'</figure>'
			);
			const transformed$ = externalImagesTransform($);
			transformed$.html().should.equal(
				'<figure class="n-content-image n-content-image--full">' +
					'<img src="http://my-image/image.jpg" width="1600" height="960">' +
				'</figure>'
			);
		});

		it('applies inline variation when source image is portrait and is less than 600px wide', () => {
			const $ = cheerio.load(
				'<figure class="n-content-image">' +
					'<img src="http://my-image/image.jpg" width="400" height="800">' +
				'</figure>'
			);
			const transformed$ = externalImagesTransform($);
			transformed$.html().should.equal(
				'<figure class="n-content-image n-content-image--inline">' +
					'<img src="http://my-image/image.jpg" width="400" height="800">' +
				'</figure>'
			);
		});

		it('applies center variation when source image is portrait and width is between 600px and 700px', () => {
			const $ = cheerio.load(
				'<figure class="n-content-image">' +
					'<img src="http://my-image/image.jpg" width="600" height="1200">' +
				'</figure>'
			);
			const transformed$ = externalImagesTransform($);
			transformed$.html().should.equal(
				'<figure class="n-content-image n-content-image--center">' +
					'<img src="http://my-image/image.jpg" width="600" height="1200">' +
				'</figure>'
			);
		});

		it('applies full variation when source image has no dimensions', () => {
			const $ = cheerio.load(
				'<figure class="n-content-image">' +
						'<img src="http://my-image/image.jpg">' +
				'</figure>'
			);
			const transformed$ = externalImagesTransform($);
			transformed$.html().should.equal(
				'<figure class="n-content-image n-content-image--full">' +
					'<img src="http://my-image/image.jpg">' +
				'</figure>'
			);
		});

	});

});
