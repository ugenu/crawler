import assert from 'assert'
import { Context } from "../../../src/context/context.class";
import { Runner } from "../../../src/runner/runner";
import { Routines } from '../../../src/routine';
import { BrowserWindow } from 'electron';

describe('Context', function(){
  describe('creating the context', function(){
    it('should have the data we pass to it typed and contained within the object', function(){
      let data = {one: 1, bool: true};

      let context = new Context({ data, browser: new BrowserWindow({ show: false }) });

      assert.deepStrictEqual(context.data, data);
    });
  });

  describe("async requestUserIntervention(): Promise<void>", function(){
    it('should pause the context until the promise is resolved', async function(){
      let data = {one: 1, bool: true};
      let context = new Context({ data, browser: new BrowserWindow({ show: false }) });
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
    }, 20000);

    it('should throw an error if intervention does not occur in time', async function(){
      let data = {one: 1, bool: true};
      let context = new Context({ data, userInterventionTimeout: 5, browser: new BrowserWindow({ show: false }) });

      await context.browser.goto('https://google.com').wait(2000).run();

      context.on('request-user-intervention', async function(message, resolve, reject){
        await context.browser.type(`[name=q]`, 'butter').run();
        /** return true to continue execution */
        return resolve();
      });

      await assert.rejects(context.requestUserIntervention());

      await context.teardown();
    });
  });
});