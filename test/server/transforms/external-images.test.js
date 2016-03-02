/*global describe, it*/
'use strict';

var cheerio = require('cheerio');
var externalImagesTransform = require('../../../server/transforms/external-images');
require('chai').should();

describe('External Images Transform', () => {

	context('Placeholding the image', () => {

		it('should add a placeholder based on aspect ratio', () => {
			const $ = cheerio.load(
				'<img src="http://my-image/image.jpg" width="800" height="600" alt="Lorem ipsum">'
			);
			const transformed$ = externalImagesTransform($);
			transformed$.html().should.equal(
				'<div style="max-width:100%;width:700px;margin-left: auto;margin-right: auto;">' +
					'<div class="n-content-image__placeholder" style="padding-top:75%">' +
						'<img src="https://next-geebee.ft.com/image/v1/images/raw/http://my-image/image.jpg?source=next&amp;fit=scale-down&amp;width=700" alt="Lorem ipsum">' +
					'</div>' +
				'</div>'
			);
		});

		it('should not add a placeholder if the height and width and not known', () => {
			const $ = cheerio.load(
				'<img src="http://my-image/image.jpg" alt="Lorem ipsum">'
			);
			const transformed$ = externalImagesTransform($);
			transformed$.html().should.equal(
				'<img src="https://next-geebee.ft.com/image/v1/images/raw/http://my-image/image.jpg?source=next&amp;fit=scale-down&amp;width=700" alt="Lorem ipsum">'
			);
		});

	});

	context('Using the image service', () => {

		it('should transform the src to use the image service', () => {
			const $ = cheerio.load(
				'<img src="http://my-image/image.jpg" alt="Lorem ipsum">'
			);
			const transformed$ = externalImagesTransform($);
			transformed$('img').attr('src').should.equal(
				"https://next-geebee.ft.com/image/v1/images/raw/http://my-image/image.jpg?source=next&fit=scale-down&width=700"
			);
		});

	});

});
