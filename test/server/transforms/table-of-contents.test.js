/*global describe, it*/
'use strict';

var cheerio = require('cheerio');
var tableOfContentsTransform = require('../../../server/transforms/table-of-contents');
require('chai').should();

describe('Table Of Contents Transform', () => {

	it('should create a table of contents', () => {
		const $ = cheerio.load(
			'<h2 id="crosshead-1" class="subhead subhead--crosshead">First heading</h2>' +
				'<p>First paragraph</p>' +
			'<h2 id="crosshead-2" class="subhead subhead--crosshead">Second heading</h2>' +
				'<p>Second paragraph</p>' +
			'<h2 id="crosshead-3" class="subhead subhead--crosshead">Third heading</h2>' +
				'<p>Third paragraph</p>'
		);
		const transformed$ = tableOfContentsTransform($, {articleTOC: true});
		transformed$.html().should.equal(
			'<div class="table-of-contents" data-trackable="table-of-contents">' +
				'<h2 class="table-of-contents__title">In this article</h2>' +
				'<ol class="table-of-contents__chapters">' +
					'<li class="table-of-contents__chapter">' +
						'<a class="table-of-contents__link" href="#crosshead-1" data-trackable="toc">First heading</a>' +
					'</li>' +
					'<li class="table-of-contents__chapter">' +
						'<a class="table-of-contents__link" href="#crosshead-2" data-trackable="toc">Second heading</a>' +
					'</li>' +
					'<li class="table-of-contents__chapter">' +
						'<a class="table-of-contents__link" href="#crosshead-3" data-trackable="toc">Third heading</a>' +
					'</li>' +
				'</ol>' +
			'</div>' +
			'<h2 id="crosshead-1" class="subhead subhead--crosshead">First heading</h2>' +
				'<p>First paragraph</p>' +
			'<h2 id="crosshead-2" class="subhead subhead--crosshead">Second heading</h2>' +
				'<p>Second paragraph</p>' +
			'<h2 id="crosshead-3" class="subhead subhead--crosshead">Third heading</h2>' +
				'<p>Third paragraph</p>'
		);
	});

});
