var webdriverio = require('webdriverio'),
    should      = require('should');

describe('my webdriverio tests', function(){

    this.timeout(99999999);
    var client = {};

    before(function(done){
            client = webdriverio.remote({ desiredCapabilities: {browserName: 'chrome'} });
            client.init(done);
    });

    it('Github test',function(done) {
        client
            .url('https://github.com/')
            .getElementSize('.header-logo-wordmark', function(err, result) {
                should.not.exist(err);
                result.height.should.be.eql(26);
                result.width.should.be.eql(89);
            })
            .getTitle(function(err, title) {
                should.not.exist(err);
                title.should.be.eql('GitHub · Build software better, together.');
            })
            .getCssProperty('a[href="/plans"]', 'color', function(err, result){
                should.not.exist(err);
                result.value.should.be.eql('rgba(64,120,192,1)');
            })
            .call(done);
    });

    after(function(done) {
        client.end(done);
    });
});
