import assert from 'assert';
import { Crawler } from "../../src/crawler";

describe("Crawler", function(){
  it('should be a crawler object that has middleware for each step', function(){
    let crawler = new Crawler();
    assert(crawler);
    assert(crawler.setup);
    assert(crawler.crawl);
    assert(crawler.teardown);
  });

  describe(".run(contextOptions: any, callback: CrawlerRunCallback)", function(){
    it('should run the steps of our crawler', function(done){
      let crawler = new Crawler();
      let test = 0;

      crawler.setup.use(function(ctx, cb){
        test++;
        cb();
      });

      crawler.crawl.use(function(ctx, cb){
        test++;
        cb();
      });

      crawler.teardown.use(function(ctx, cb){
        test++;
        cb();
      });

      crawler.run({}, function(error){
        assert.ifError(error);
        assert.equal(test, 3);
        done();
      });
    });

    it('should run the steps of our crawler even if we utilize nightmare', function(done){
      let crawler = new Crawler({
        
      });
      let test = 0;

      crawler.setup.use(function(ctx, cb){
        ctx.session
          .goto('https://google.com/search?q=butter')
          .wait("#appbar")
          .then(cb)
          .catch(cb);
      });

      crawler.crawl.use(function(ctx, cb){
        ctx.evaluate(function(options){
          return options.test;
        }, {test: 0}, function(error, result){
          assert.ifError(error);
          assert.equal(result, 0);
          cb();
        });
      });

      crawler.teardown.use(function(ctx, cb){
        ctx.extra++;
        cb();
      });

      crawler.run({extra: 0}, function(error, context){
        assert.ifError(error);
        assert.equal(context.extra, 1);
        done();
      });
    }, 10000);
  });
});