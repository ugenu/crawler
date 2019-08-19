import assert from 'assert';
import { Middleware } from "../../src/middleware";
import MiddlewareContext from '../../src/context';

describe("Middleware", function(){
  it('should be a middleware object that holds instructions', function(){
    let middleware = new Middleware();
    assert(middleware);
    assert(middleware.instructions);
  });

  describe(".use(instruction)", function(){
    it('should add the instruction to the middleware instructions', function(){
      let middleware = new Middleware();
      middleware.use(function(){});
      assert(middleware.instructions.length > 0);
    });

    it('should throw an error if we do not pass in a function', function(){
      let middleware = new Middleware();
      assert.throws(function(){
        //@ts-ignore
        middleware.use('string');
      }, 'shouldThrow')
    });
  });

  describe(".use(instructions)", function(){
    it('should add the list of instructions to the middleware instructions', function(){
      let middleware = new Middleware();
      //@ts-ignore
      middleware.use([function(){}, function(){}]);
      assert(middleware.instructions.length > 0);
    });

    it('should throw an error if one of the instructions is not a function', function(){
      let middleware = new Middleware();
      assert.throws(function(){
        //@ts-ignore
        middleware.use([function(){}, 'one']);
      }, 'shouldThrow')
    });
  });

  describe(".run(context, callback)", function(){
    it('should run all the instructions of the middleware until completion', function(done){
      let middleware = new Middleware();
      let test = 0;

      middleware.use(function(ctx, cb){
        test++;
        cb();
      });

      middleware.use(function(ctx, cb){
        test++;
        cb();
      });

      middleware.run({} as MiddlewareContext, function(error){
        assert.ifError(error);
        assert.equal(test, 2);
        done();
      });
    });

    it('should catch an error that occured while running an instruction', function(done){
      let middleware = new Middleware();
      let test = 0;

      middleware.use(function(ctx, cb){
        test++;
        cb();
      });

      middleware.use(function(ctx, cb){
        throw new Error('uh oh');
        cb();
      });

      middleware.run({} as MiddlewareContext, function(error){
        if(!error){
          throw new Error('should have been caught');
        }
        done();
      });
    });

    describe("callback with options", function(){
      describe(".restart = true", function(){
        it('should repeat the middleware instructions if we pass a restart option to the callback', function(done){
          let middleware = new Middleware();
          let test = 0;
    
          middleware.use(function(ctx, cb){
            test++;
            cb();
          });
    
          middleware.use(function(ctx, cb){
            test++;
            if(test < 4){
              return cb(undefined, {restart: true})
            }
            return cb();
          });
    
          middleware.run({} as MiddlewareContext, function(error){
            assert.ifError(error);
            assert(test >= 4);
            done();
          });
        });
      });
    })
  });
});