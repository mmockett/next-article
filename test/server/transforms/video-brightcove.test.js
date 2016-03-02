/*global describe, it*/
'use strict';

var cheerio = require('cheerio');
var videoBrightcoveTransform = require('../../../server/transforms/video-brightcove');
require('chai').should();

describe('Video Brightcove Transform', () => {

	it('should add attributes to the brightcove video element for n-video', () => {
		const $ = cheerio.load(
			'<div class="n-content-video n-content-video--brightcove">' +
				'<div class="n-content-video__placeholder">' +
					'<a' +
						' data-embedded="true"' +
						' data-asset-type="video"' +
						' href="http://video.ft.com/4084879507001"></a>' +
				'</div>' +
			'</div>'
		);
		const transformed$ = videoBrightcoveTransform($, {useBrightcovePlayer: false});
		transformed$.html().should.equal(
			'<div class="n-content-video n-content-video--brightcove">' +
				'<div class="n-content-video__placeholder"' +
				' data-n-component="n-video"' +
				' data-n-video-source="brightcove"' +
				' data-n-video-id="4084879507001">' +
					'<a' +
						' data-embedded="true"' +
						' data-asset-type="video"' +
						' href="http://video.ft.com/4084879507001"></a>' +
				'</div>' +
			'</div>'
		);
	});

	it('should add a brightcove video player attribute if brightcove player flag on', () => {
		const $ = cheerio.load(
			'<div class="n-content-video n-content-video--brightcove">' +
				'<div class="n-content-video__placeholder">' +
					'<a' +
						' data-embedded="true"' +
						' data-asset-type="video"' +
						' href="http://video.ft.com/4084879507001"></a>' +
				'</div>' +
			'</div>'
		);
		const transformed$ = videoBrightcoveTransform($, {useBrightcovePlayer: true});
		transformed$.html().should.equal(
			'<div class="n-content-video n-content-video--brightcove">' +
				'<div class="n-content-video__placeholder"' +
				' data-n-component="n-video"' +
				' data-n-video-source="brightcove"' +
				' data-n-video-id="4084879507001"' +
				' data-n-video-player="brightcove">' +
					'<a' +
						' data-embedded="true"' +
						' data-asset-type="video"' +
						' href="http://video.ft.com/4084879507001"></a>' +
				'</div>' +
			'</div>'
		);
	});

});
