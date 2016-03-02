/* global describe, it */
'use strict';

var transform = require('./transform-helper');
require('chai').should();

describe('Links', function () {

	it('Removes title from links with text', () => {
		return transform(
				'<body>' +
					'<a title="Wolfgang Münchau: Draghi’s QE is an imperfect compromise " href="/f203bf76-a241-11e4-bbb8-00144feab7de">Launched a programme of quantitative easing to </a>' +
				'</body>'
			)
			.then(function (transformedXml) {
				transformedXml.should.equal(
					'<a href="/f203bf76-a241-11e4-bbb8-00144feab7de">Launched a programme of quantitative easing to </a>\n'
				);
			});
	});

	it('Does not alter a link that does not have text', () => {
		return transform(
			'<body>' +
				'<a' +
					' data-embedded="true"' +
					' data-asset-type="video"' +
					' href="http://video.ft.com/4084879507001"></a>' +
			'</body>'
			)
			.then(function (transformedXml) {
				transformedXml.should.equal(
					'<div class="n-content-video n-content-video--brightcove">' +
					'<a' +
						' data-embedded="true"' +
						' data-asset-type="video"' +
						' href="http://video.ft.com/4084879507001"></a>' +
					'</div>\n'
				);
			});

	});

});
