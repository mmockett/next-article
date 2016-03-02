/* global describe, it */

'use strict';

const transform = require('./transform-helper');
const expect = require('chai').expect;

describe('Info box', () => {

	it('translates tables with a single column into an info box', () => {
		return transform(
				'<html>' +
					'<body>' +
						'<table class="data-table">' +
							'<caption>Lorem ipsum doler sit amet</caption>' +
							'<tr>' +
								'<td><p>Ut enim ad minim veniam</p><br>I am a text node!</td>' +
							'</tr>' +
						'</table>' +
					'</body>' +
				'</html>'
			)
			.then((transformedXml) => {
				expect(transformedXml).to.equal(
					'<aside class="n-content-info-box">' +
						'<h3 class="n-content-info-box__headline">Lorem ipsum doler sit amet</h3>' +
						'<div class="n-content-info-box__content">' +
							'<p>Ut enim ad minim veniam</p>' +
							'<br>I am a text node!' +
						'</div>' +
					'</aside>\n'
				);
			});
	});

	it('leaves tables with multiple rows or columns alone', () => {
		return transform(
				'<html>' +
					'<body>' +
						'<table class="data-table">' +
							'<caption>Lorem ipsum doler sit amet</caption>' +
							'<tr>' +
								'<td><p>Ut enim ad minim veniam</p></td>' +
							'</tr>' +
							'<tr>' +
								'<td><p>Ut enim ad minim veniam</p></td>' +
							'</tr>' +
						'</table>' +
						'<table class="data-table">' +
							'<caption>Lorem ipsum doler sit amet</caption>' +
							'<tr>' +
								'<td><p>Ut enim ad minim veniam</p></td>' +
								'<td><p>Ut enim ad minim veniam</p></td>' +
							'</tr>' +
						'</table>' +
					'</body>' +
				'</html>'
			)
			.then((transformedXml) => {
				expect(transformedXml).to.equal(
					'<table class="data-table">' +
						'<caption>Lorem ipsum doler sit amet</caption>' +
						'<tr>' +
							'<td><p>Ut enim ad minim veniam</p></td>' +
						'</tr>' +
						'<tr>' +
							'<td><p>Ut enim ad minim veniam</p></td>' +
						'</tr>' +
					'</table>' +
					'<table class="data-table">' +
						'<caption>Lorem ipsum doler sit amet</caption>' +
						'<tr>' +
							'<td><p>Ut enim ad minim veniam</p></td>' +
							'<td><p>Ut enim ad minim veniam</p></td>' +
						'</tr>' +
					'</table>\n'
				);
			});
	});

});
