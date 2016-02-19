/*global describe, it*/
'use strict';

var cheerio = require('cheerio');
var externalImagesEncodingTransform = require('../../../server/transforms/external-images-encoding');
require('chai').should();

describe('External Images Encoding', function() {

	it('should double encode spaces in src of external image urls', function() {
		var $ = cheerio.load(
				'<p>test test test</p>' +
				'<figure class="n-content-image">' +
					'<img alt="" src="https://next-geebee.ft.com/image/v1/images/raw/http://clamo.ftdata.co.uk/files/2015-07/21/FT%20Dow%20Stock%20Moves%20IBM%20UTX%207-21-15.png?source=next&fit=scale-down&width=710">' +
				'</figure>'
		);
		var transformed$ = externalImagesEncodingTransform($);
		transformed$.html().should.equal(
				'<p>test test test</p>' +
				'<figure class="n-content-image">' +
					'<img alt="" src="https://next-geebee.ft.com/image/v1/images/raw/http%3A%2F%2Fclamo.ftdata.co.uk%2Ffiles%2F2015-07%2F21%2FFT%2520Dow%2520Stock%2520Moves%2520IBM%2520UTX%25207-21-15.png?source=next&amp;fit=scale-down&amp;width=710">' +
				'</figure>'
		);
	});

	it('should unescape html entites before encoding', function() {
		var $ = cheerio.load(
			'<figure class="n-content-image">' +
				'<img alt="" src="https://next-geebee.ft.com/image/v1/images/raw/http://markets.ft.com/Research/API/ChartBuilder?t=equities&amp;p=eyJzeW1ib2wiOiIyNDQ1Nzl8NTcyMDA5IiwicmVnaW9uIjpudWxsLCJoZWlnaHQiOiIzMzgiLCJ3aWR0aCI6IjYwMCIsImxpbmVTdHlsZSI6ImxpbmUiLCJkdXJhdGlvbiI6IjUiLCJzdGFydERhdGUiOm51bGwsImVuZERhdGUiOm51bGwsInByaW1hcnlMYWJlbCI6IlJSLjpMU0UiLCJzZWNvbmRhcnlMYWJlbCI6IkZUU0UgMTAwIiwidGVydGlhcnlMYWJlbCI6bnVsbCwicXVhdGVybmFyeUxhYmVsIjpudWxsLCJpc01vYmlsZSI6ZmFsc2UsIlNob3dEaXNjbGFpbWVyIjp0cnVlLCJ1bml0IjoicHgifQ==?source=next&fit=scale-down&width=710">' +
			'</figure>'
		);
		var transformed$ = externalImagesEncodingTransform($);
		transformed$.html().should.equal(
			'<figure class="n-content-image">' +
				'<img alt="" src="https://next-geebee.ft.com/image/v1/images/raw/http%3A%2F%2Fmarkets.ft.com%2FResearch%2FAPI%2FChartBuilder%3Ft%3Dequities%26p%3DeyJzeW1ib2wiOiIyNDQ1Nzl8NTcyMDA5IiwicmVnaW9uIjpudWxsLCJoZWlnaHQiOiIzMzgiLCJ3aWR0aCI6IjYwMCIsImxpbmVTdHlsZSI6ImxpbmUiLCJkdXJhdGlvbiI6IjUiLCJzdGFydERhdGUiOm51bGwsImVuZERhdGUiOm51bGwsInByaW1hcnlMYWJlbCI6IlJSLjpMU0UiLCJzZWNvbmRhcnlMYWJlbCI6IkZUU0UgMTAwIiwidGVydGlhcnlMYWJlbCI6bnVsbCwicXVhdGVybmFyeUxhYmVsIjpudWxsLCJpc01vYmlsZSI6ZmFsc2UsIlNob3dEaXNjbGFpbWVyIjp0cnVlLCJ1bml0IjoicHgifQ%3D%3D?source=next&amp;fit=scale-down&amp;width=710">' +
			'</figure>'
		);
	});

});
