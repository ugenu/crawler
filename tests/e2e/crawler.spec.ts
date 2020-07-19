import assert from 'assert';
import Crawler from '../../src'
import { BrowserWindow } from 'electron';

interface StartPageResult {
  title: string,
  href: string,
  description: string,
}


describe("Crawler", function(){
  it.only('should be able to crawl through google search results', async function(){
    let crawler = new Crawler<StartPageResult[]>({
      data: [],
      browser: new BrowserWindow({ show: false }),
    });


    crawler.setup(async context  => {
      await context.browser
        .goto('https://www.startpage.com/')
        .wait('#q')
        .type('#q', 'butter')
        .click('.search-form-home__form__button')
        .wait('.mainline-results')
        .run();
    });
      
    crawler.crawl(async context => {
      await context.browser.wait('.mainline-results').run();
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
    });

    crawler.paginate(async context => {
      let count = context.data.length;

      if(count < 30){
        await context.browser
          .click('.pagination__next-prev-button.next')
          .wait(1000)
          .run()
      }

      return context.data.length < 30;
    });

    let result = await crawler.run();

    assert(result.length > 0);

  }, 50000);
});
