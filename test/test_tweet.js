import { expect } from 'chai';

import twitter from 'twitter-text';

describe('getTweetLength', () => {
  it('it works', () => {
    expect(twitter.getTweetLength('this is a tweet https://google.com/')).to.eql(39);
    expect(twitter.getTweetLength('ಬೆಂಗಳೂರು')).to.eql(8);
  });
});

describe('substr', () => {
  it('it works', () => {
    expect('ಬೆಂಗಳೂರು'.substr(0, 3)).to.eql('ಬೆಂ');
  });
});