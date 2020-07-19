import assert from 'assert'
import { Routines } from "../../src/routine";
import { Runner } from "../../src/runner";
import { Context } from "../../src/context";
import { BrowserWindow } from 'electron';



describe("Selectorizor", function(){
  it('should selectorize the content', async function(){
    let context = new Context({
       browser: new BrowserWindow({ show: false })
    });
    
    await context.browser.goto('https://www.nytimes.com/section/us').wait('#collection-us').run();

    await context.injectTargets();

    let results = await context.selectorizor({
      root: '#stream-panel li',
      selectors: {
        link: {
          selector: 'a',
          attr: 'href',
          fn: function(value){
            let url = new URL(value, window.location.href)
            return url.href;
          }
        },
        desc: {
          selector: 'p'
        },
        title: {
          selector: 'h2'
        }
      }
    }, {link: '', desc: '', title: ''});

    assert(results.length > 0);

    for(let result of results){
      assert(result.desc);
      assert(result.link);
      assert(result.title);
    }

    await context.teardown();

  }, 30000);
});