import assert from 'assert'
import { Routines } from "../../src/routine";
import { Runner } from "../../src/runner";
import { Context } from '../../src/context';
import { BrowserWindow } from 'electron';

describe("Inject", function(){
  
  it('should inject the library we want if target test fails', async function(){
    let context = new Context({
      browser: new BrowserWindow({ show: false }),
    });

    await context.browser.goto('http://google.com').wait('[name=q]').run();
    let injected = await context.injectTargets();

    let result = await context.browser.evaluate(function(){
      //@ts-ignore
      return window.jQuery ? true : false;
    });
    
    assert(result);
    assert(injected > 0);
    
    await context.teardown();
  }, 40000);
  

  it.skip('should not inject on a context that has no url loaded', async function(){
    let context = new Context({});

    await context.browser.run();
   
    let injected = await context.injectTargets();

    assert.equal(injected, 0);

    await context.teardown();
  });
});