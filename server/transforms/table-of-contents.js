"use strict"

const cheerio = require('cheerio');

module.exports = function($, flags) {

	if (flags.articleTOC) {

		const $headings = $('h2.subhead--crosshead');

		if ($headings.length > 2) {
			let $tocWrapper = cheerio(
				'<div class="table-of-contents" data-trackable="table-of-contents">' +
					'<h2 class="table-of-contents__title">In this article</h2>' +
					'<ol class="table-of-contents__chapters"></ol>' +
				'</div');

			$headings.each(i => {
				$tocWrapper.find('ol').append(
					'<li class="table-of-contents__chapter">' +
						`<a class="table-of-contents__link" href="#crosshead-${(i + 1)}" data-trackable="toc">` +
							`${$headings.eq(i).text()}` +
						'</a>' +
					'</li>'
				)
			});

			$.root().prepend($tocWrapper);
		}

	}

	return $;
};
