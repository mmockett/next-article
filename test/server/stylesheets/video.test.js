/* global describe, it */
'use strict';

const expect = require('chai').expect;
const transform = require('./transform-helper');

describe('Video', () => {

	describe('FT video', () => {

		it('should transform videos', () => {
			return transform(
					'<body>' +
						'<a' +
							' data-embedded="true"' +
							' data-asset-type="video"' +
							' href="http://video.ft.com/4084879507001"></a>' +
					'</body>'
				)
				.then(function (transformed) {
					expect(transformed).to.equal(
						'<div class="n-content-video n-content-video--brightcove">' +
						'<a' +
							' data-embedded="true"' +
							' data-asset-type="video"' +
							' href="http://video.ft.com/4084879507001"></a>' +
						'</div>\n'
					);
				});
		});

		it('should not transform if link is not empty', () => {
			return transform(
					'<body>' +
						'<a' +
							' href="http://video.ft.com/4080875696001/A-FTSE-landmark-that-matters/Markets"' +
							' title="A FTSE landmark that matters - FT.com">' +
							'FTSE-All World index setting a record' +
						'</a>' +
					'</body>'
				)
				.then(function (transformed) {
					expect(transformed).to.equal(
						'<a' +
							' href="http://video.ft.com/4080875696001/A-FTSE-landmark-that-matters/Markets">' +
							'FTSE-All World index setting a record' +
						'</a>\n'
					);
				});
		});

	});

	describe('YouTube', () => {

		it('should transform videos', () => {
			return transform(
					'<body>' +
						'<a href="https://www.youtube.com/watch?v=n2GTNK4VsXs&hello=world"></a>' +
					'</body>'
				)
				.then(function (transformed) {
					expect(transformed).to.equal(
						'<div class="n-content-video n-content-video--youtube">' +
							'<iframe' +
								' frameborder="0"' +
								' src="https://www.youtube.com/embed/n2GTNK4VsXs"></iframe>' +
						'</div>\n'
					);
				});
		});

		it('should extract video from parent paragraph', () => {
			return transform(
					'<body>' +
						'<p>' +
							'<a href="https://www.youtube.com/watch?v=n2GTNK4VsXs"></a>' +
						'</p>' +
					'</body>'
				)
				.then(function (transformed) {
					expect(transformed).to.equal(
						'<div class="n-content-video n-content-video--youtube">' +
							'<iframe' +
								' frameborder="0"' +
								' src="https://www.youtube.com/embed/n2GTNK4VsXs"></iframe>' +
						'</div>\n'
					);
				});
		});

		it('should not transform if the link is not empty', () => {
			return transform(
					'<body>' +
						'<p>' +
							'<a href="https://www.youtube.com/watch?v=n2GTNK4VsXs">' +
								'Hilary Benn\'s Impassioned Speech in a P' +
							'</a>' +
						'</p>' +
						'<a href="https://www.youtube.com/watch?v=n2GTNK4VsXs">' +
							'Hilary Benn\'s Impassioned Speech' +
						'</a>' +
					'</body>'
				)
				.then(function (transformed) {
					expect(transformed).to.equal(
						'<p>' +
							'<a' +
								' href="https://www.youtube.com/watch?v=n2GTNK4VsXs">' +
								'Hilary Benn\'s Impassioned Speech in a P' +
							'</a>' +
						'</p>' +
						'<a' +
							' href="https://www.youtube.com/watch?v=n2GTNK4VsXs">' +
							'Hilary Benn\'s Impassioned Speech' +
						'</a>\n'
					);
				});
		});

	});

});
