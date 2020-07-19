import assert from 'assert'
import { Routines } from "../../src/routine";
import { Runner } from "../../src/runner";
import { Context } from "../../src/context";
import { BrowserWindow } from 'electron';

interface StartPageResult {
  title: string,
  href: string,
  description: string,
}

let events = {
  setup: 0,
  crawl: 0,
  paginate: 0,
};

let routines: Routines<StartPageResult[]> = {
  setup: [async (context) => {
    await context.browser
      .goto('https://www.startpage.com/')
      .wait('#q')
      .type('#q', 'butter')
      .click('.search-form-home__form__button')
      .wait('.w-gl--default .w-gl__result')
      .run();
    events.setup++;
  }],
  crawl: [async (context) => {
    await context.browser.wait('.mainline-results .w-gl__result').run();
    let results = await context.selectorizor({
      root: '.mainline-results .w-gl__result',
      selectors: {
        title: {
          selector: 'h3'
        },
        href: {
          selector: '.w-gl__result-title',
          attr: 'href'
        },
        desc: {
          selector: 'p'
        }
      }
    }, {} as StartPageResult);

    context.data = context.data.concat(results);
    events.crawl++;
  }],
  paginate: [async (context) => {
    let count = context.data.length;

    if(count < 20){
      events.paginate++;
      await context.browser
        .click('.pagination__next-prev-button.next')
        .wait(1000)
        .run();

      return true;
    }

    return count < 20;
  }]
};

describe("Runner", function(){
  let context: Context<StartPageResult[]>;

  beforeAll(async function(){
    let runner = new Runner(routines);

    context = await runner.run({
      data: [],
      browser: new BrowserWindow({ width: 1920, height: 1080, show: false })
    });
  }, 60000);

  describe("setup", function(){
    it('should have run the setup only once', function(){
      assert.equal(events.setup, 1);
    });
  });

  describe("crawl", function(){
    it('should have run the crawl only once', function(){
      assert.equal(events.crawl, 2);
    });

    it('should have some results from the crawl', function(){
      assert(Object.values(context.data).length > 0);
    });
  });

  describe("paginate", function(){
    it('should have ran the paginate only once', function(){
      assert.equal(events.paginate, events.crawl - 1);
    });
  });
});