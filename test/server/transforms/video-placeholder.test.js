/*global describe, it*/
'use strict';

var cheerio = require('cheerio');
var videoPlaceholderTransform = require('../../../server/transforms/video-placeholder');
require('chai').should();

describe('Video Placeholder Transform', () => {

	it('should add a placeholder to a video element (brightcove)', () => {
		const $ = cheerio.load(
			'<div class="n-content-video n-content-video--brightcove">' +
			'<a' +
				' data-embedded="true"' +
				' data-asset-type="video"' +
				' href="http://video.ft.com/4084879507001"></a>' +
			'</div>'
		);
		const transformed$ = videoPlaceholderTransform($);
		transformed$.html().should.equal(
			'<div class="n-content-video n-content-video--brightcove">' +
				'<div class="n-content-video__placeholder">' +
					'<a' +
						' data-embedded="true"' +
						' data-asset-type="video"' +
						' href="http://video.ft.com/4084879507001"></a>' +
				'</div>' +
			'</div>'
		);
	});

	it('should add a placeholder to a video element (youtube)', () => {
		const $ = cheerio.load(
			'<div class="n-content-video n-content-video--youtube">' +
				'<iframe' +
					' frameborder="0"' +
					' src="https://www.youtube.com/embed/n2GTNK4VsXs"></iframe>' +
			'</div>'
		);
		const transformed$ = videoPlaceholderTransform($);
		transformed$.html().should.equal(
			'<div class="n-content-video n-content-video--youtube">' +
				'<div class="n-content-video__placeholder">' +
					'<iframe' +
						' frameborder="0"' +
						' src="https://www.youtube.com/embed/n2GTNK4VsXs"></iframe>' +
				'</div>' +
			'</div>'
		);
	});

});
