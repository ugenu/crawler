import assert from 'assert';
import { Context } from "../../../src/context";
import { UserIntervention } from "../../../src/context";
import { BrowserWindow } from 'electron';

describe("UserIntervention", function(){
  describe("requesting intervention", function(){
    it('should make the context emit a "request-user-intervention" event', async function(){
      let context = new Context({ browser: new BrowserWindow({ show: false })});
      let requested = false;

      context.once('request-user-intervention', async function(message, resolve, reject){
        requested = true;
        assert.equal(message.title, 'INTERVENTION');
        assert.equal(message.message, 'PLS');
        return resolve();
      });

      await UserIntervention.Request(context, {title: 'INTERVENTION', message: 'PLS'});

      assert(requested);

      await context.teardown();
    });

    it('should reject the promise if no resolution/rejection is made by the timeout', async function(){
      let context = new Context({ browser: new BrowserWindow({ show: false })});
  
      context.once('request-user-intervention', async function(message, resolve, reject){

      });

      await assert.rejects(
        UserIntervention.Request(context, {title: 'INTERVENTION', message: 'PLS'}, 5)
      );

      await context.teardown();
    });

    it('should should wait until intervention has occurred to continue', async function(){
      let context = new Context({ browser: new BrowserWindow({ show: false })});
      await context.browser.goto('https://google.com').wait(2000).run();

      context.on('request-user-intervention', async function(message, resolve, reject){
        await context.browser.type(`[name=q]`, 'butter').run();
        /** return true to continue execution */
        return resolve();
      });

      await context.requestUserIntervention();

      let searchText = await context.browser.evaluate(() : string =>  {
        //@ts-ignore
        return document.querySelector("[name=q]").value;
      });

      assert.equal(searchText, 'butter');

      await context.teardown();
    }, 10000);
  });
});