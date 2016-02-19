/* global describe, it */

'use strict';

const transform = require('./transform-helper');
const expect = require('chai').expect;

describe('External images', () => {

	describe('re-formatted as figures', () => {

		it('formats images as figures', () => {
			return transform(
					'<html>' +
						'<body>' +
							'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>' +
							'<img src="http://my-image/image.jpg" width="800" height="600" alt="Lorem ipsum" />' +
							'<p>Ut enim ad minim <strong>veniam</strong>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' +
						'</body>' +
					'</html>'
				)
				.then((transformedXml) => {
					expect(transformedXml).to.equal(
						'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>' +
						'<figure class="n-content-image">' +
								'<img src="http://my-image/image.jpg" width="800" height="600" alt="Lorem ipsum">' +
						'</figure>' +
						'<p>Ut enim ad minim <strong>veniam</strong>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n'
					);
				});
		});

		it('moves images out of containing <p> if they\'re the only thing in it', () => {
			return transform(
					'<html>' +
						'<body>' +
							'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>' +
							'<p>' +
								'<img src="http://my-image/image.jpg" width="800" height="600" alt="Lorem ipsum" />' +
							'</p>' +
							'<p>Ut enim ad minim <strong>veniam</strong>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' +
						'</body>' +
					'</html>'
				)
				.then((transformedXml) => {
					expect(transformedXml).to.equal(
						'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>' +
						'<figure class="n-content-image">' +
								'<img src="http://my-image/image.jpg" width="800" height="600" alt="Lorem ipsum">' +
						'</figure>' +
						'<p>Ut enim ad minim <strong>veniam</strong>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n'
					);
				});
		});

		it('moves images out of containing <p> if they\'re not the only thing in it', () => {
			return transform(
					'<html>' +
						'<body>' +
							'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>' +
							'<p>' +
								'<img src="http://my-image/image.jpg" width="800" height="600" />' +
								'Ut enim ad minim <strong>veniam</strong>, <a href="http://ft.com">quis nostrud exercitation</a> ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
							'</p>' +
						'</body>' +
					'<html>'
				)
				.then((transformedXml) => {
					expect(transformedXml).to.equal(
						'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>' +
						'<figure class="n-content-image">' +
								'<img src="http://my-image/image.jpg" width="800" height="600">' +
						'</figure>' +
						'<p>Ut enim ad minim <strong>veniam</strong>, <a href="http://ft.com">quis nostrud exercitation</a> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n'
					);
				});
		});

		it('moves images out of containing <a>', () => {
			return transform(
					'<html>' +
						'<body>' +
							'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>' +
							'<p>' +
								'<a href=""><img src="http://my-image/image.jpg" width="800" height="600" alt="Lorem ipsum" /></a> Lorem ipsum <i>doler</i> sit amet.' +
							'</p>' +
							'<p>Ut enim ad minim <strong>veniam</strong>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' +
						'</body>' +
					'</html>'
				)
				.then((transformedXml) => {
					expect(transformedXml).to.equal(
						'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>' +
						'<figure class="n-content-image">' +
								'<img src="http://my-image/image.jpg" width="800" height="600" alt="Lorem ipsum">' +
						'</figure>' +
						'<p> Lorem ipsum <i>doler</i> sit amet.</p>' +
						'<p>Ut enim ad minim <strong>veniam</strong>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n'
					);
				});
		});

	});

	describe('captions', () => {

		it('adds caption when the longdesc attribute is present', () => {
			return transform(
					'<html>' +
						'<body>' +
							'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>' +
							'<p><img src="http://my-image/image.jpg" longdesc="This is a long description" width="800" height="600" /></p>' +
							'<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' +
						'</body>' +
					'</html>\n'
				)
				.then((transformedXml) => {
					expect(transformedXml).to.equal(
						'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>' +
						'<figure class="n-content-image">' +
							'<img src="http://my-image/image.jpg" longdesc="This is a long description" width="800" height="600">' +
							'<figcaption class="n-content-image__caption">This is a long description</figcaption>' +
						'</figure>' +
						'<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n'
					);
				});
		});

		it('adds caption when the copyright is present', () => {
			return transform(
				'<html>' +
					'<body>' +
						'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>' +
						'<p><img src="http://my-image/image.jpg" data-copyright="© Bloomberg" width="800" height="600" /></p>' +
						'<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' +
					'</body>' +
				'</html>\n'
			)
			.then((transformedXml) => {
				expect(transformedXml).to.equal(
					'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>' +
					'<figure class="n-content-image">' +
						'<img src="http://my-image/image.jpg" data-copyright="© Bloomberg" width="800" height="600">' +
						'<figcaption class="n-content-image__caption">© Bloomberg</figcaption>' +
					'</figure>' +
					'<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n'
				);
			});
		});

		it('adds caption when both the longdesc and copyright are present', () => {
			return transform(
				'<html>' +
					'<body>' +
						'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>' +
						'<p><img src="http://my-image/image.jpg" longdesc="This is a long description" data-copyright="© Bloomberg" width="800" height="600" /></p>' +
						'<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' +
					'</body>' +
				'</html>\n'
			)
			.then((transformedXml) => {
				expect(transformedXml).to.equal(
					'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>' +
					'<figure class="n-content-image">' +
							'<img src="http://my-image/image.jpg" longdesc="This is a long description" data-copyright="© Bloomberg" width="800" height="600">' +
						'<figcaption class="n-content-image__caption">This is a long description © Bloomberg</figcaption>' +
					'</figure>' +
					'<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n'
				);
			});
		});

	});

});
