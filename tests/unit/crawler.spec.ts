import assert from 'assert';
import { Crawler } from "../../src/crawler";

describe("Crawler", function(){
  it('should be a crawler object that has middleware for each step', function(){
    let crawler = new Crawler();
    assert(crawler);
    assert(crawler.setup);
    assert(crawler.crawl);
    assert(crawler.pagination);
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

      crawler.pagination.use(function(ctx, cb){
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

      crawler.pagination.use(function(ctx, cb){
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

  describe("pagination", function(){
    it('should be a separate middleware property to the crawler', function(){
      let crawler = new Crawler();
      assert(crawler.pagination);;
    });

    it('should let us paginate through pages and repeat the crawl middleware until we say otherwise', function(done){
      let crawler = new Crawler({
        nightmare: {
          
        }
      });
      let results = [];

      crawler.setup.use(function(ctx, cb){
        ctx.session
          .goto('https://www.google.com/search?q=google.com')
          .wait('#appbar')
          .then(cb)
          .catch(cb);
      });

      crawler.crawl.use(function(ctx, cb){
        ctx.evaluate(function(){
          let results = [];
          //@ts-ignore
          let els = document.querySelectorAll('.ellip');
          els.forEach(function(el){
            results.push(el.textContent);
          });
          return results;
        }, function(error, crawl){
          assert.ifError(error);
          results = results.concat(crawl);
          return cb();
        });
      });

      crawler.pagination.use(function(ctx, cb){
        if(results.length < 30){
          ctx.evaluate(function(){
            let href = document.getElementById('pnnext').getAttribute('href');
            return (new URL(href, window.location.href)).href;
          }, function(error, result){
            if(error){
              return cb(error);
            }
            ctx.session.goto(result)
              .wait('#appbar')
              .then(function(){
                return cb(undefined, {restart: true});
              })
              .catch(cb)
          });
          return;
        }
        return cb();
      });

      crawler.run({}, function(error, context){
        assert.ifError(error);
        assert(results.length >= 30);
        done();
      });
    }, 20000);
  });

  describe("events", function(){
    it('should emit a begin/end for each step', function(done){
      let events: string[] = [];
      let crawler = new Crawler();
      let steps = ['setup', 'crawl', 'pagination', 'teardown'];
      steps.forEach(function(step){
        let begin = `begin:${step}`;
        let end = `end:${step}`;
        crawler.on(begin, function(){
          events.push(begin);
        });

        crawler.on(end, function(){
          events.push(end);
        });
      });

      crawler.run({}, function(error){
        assert.ifError(error);
        assert(events.includes('begin:setup'));
        assert(events.includes('end:crawl'));
        assert(events.includes('begin:pagination'));
        assert(events.includes('end:teardown'));
        done();
      });
    });
  });
});