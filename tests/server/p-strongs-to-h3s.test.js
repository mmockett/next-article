/*global it*/
'use strict';

var expect = require('chai').expect;
var pStrongsToH3s = require('../../server/transforms/p-strongs-to-h3s');

it('should convert `<p><strong>...</p></strong>` to `<h3>...</h3>`', function() {
    var transformed = pStrongsToH3s('<p><strong>London in a world of its own</strong></p>');
    expect(transformed).to.equal('<h3>London in a world of its own</h3>');
});
