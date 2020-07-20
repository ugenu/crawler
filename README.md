![Crawler logo](assets/documentation-logo.png)
# @ugenu.io/crawler - a fun promise based crawler

* [Installation](#installation)
* [Use](#use)
  * [ES Module](#es-module)
  * [Options / Routines](#options--routines)
* [Concepts](#concepts)
* [Crawler Context](#crawler-context)
* [Real Examples](#real-examples)
* [Inject Targets](#inject-targets)
* [Events](#events)
* [Requesting User Intervention](#requesting-user-intervention)
* [Selectorizor](#selectorizor)
* [Donate](#donate)
* [License](#license)

## Installation
```
npm install @ugenu.io/crawler [--save]
```

## Use
### ES module
```ts
  import Crawler from '@ugenu.io/crawler'
  
  let crawler = new Crawler(options);

  crawler.crawl(async context => {

  });

  let results = await crawler.run(); // equals whatever you have done with options.data
```

### Options / Routines
```ts
  let options = {
    http?: AxiosRequestConfig //axios options

    browser?: BrowserView | BrowserWindow | WebviewTag, // the created browser object that can access and manipulate pages

    inject?: [] // targets to inject if we have any,

    data: any // any data you want to share within your context
  };
```

## Concepts

| Concept | Description |
| --- | --- |
| `context` | a session that holds data, as well as a headless browser (nightmare) and http request module (axios) |
| `routine` | a function like a middleware takes the generated context and runs specific steps |
| `runner`  | a class that generates a context and passes that through the predefined routine |

## Crawler Context
The crawler context has a few properties and methods to help you with your structured scraping.

| Property / Method                                                                       | Description                                                                                                                                                             |
|-----------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `context.http: AxiosInstance`                                                           | Shared axios instance. Configurable to allow cookies across your crawling                                                                                               |
| `context.browser: Electrolizer`                                                         | Shared [Electrolizer](https://github.com/ugenu/electrolizer) instance                                                                                                    |
| `context.selectorizor(options): Promise<any[]>`                                         | Helper plugin to scrape structured and predictable results. [Selectorizor](#selectorizor)                                                                               |
| `context.delay(ms: number): Promise<void>`                                              | Simple delay function                                                                                                                                                   |
| `context.requestUserIntervention(message?: UserIntervention.Message, timeout?: number)` | Use this while scraping if you suspect that you may run into any issues that require a human to intervene. [Requesting User Intervention](#requesting-user-intervention) |
| `context.html(): Promise<string>`                                                       | Returns the current html that is displayed from the Electrolizer instance                                                                                               |
| `context.$(providedHtml?: string): Promise<CheerioStatic>`                              | Returns a cheerio instance that contains the html you pass into it, or the current browser html.                                                                        |
| `context.reset(hard?: boolean): Promise<void>`                                          | Method is run before/after crawler routine to recreate the http/browser properties, but if you want to do a hard reset (remove all listeners) call the function yourself and pass true to the parameter. |

## Stages
The crawler object exposes three stages to hook onto.


| Stage | Description |
| --- | --- |
| `setup` | Functions passed here will run ONCE as a setup step. |
| `crawl` | Functions passed here will run ONCE initially, and then again after a true response from paginate |
| `paginate`  | Functions passed here will run after every `crawl` stage. If the value of the LAST paginate function is `true` we will run the crawl middleware |


### Pseudocode examples
```ts
  let crawler = new Crawler({
    // this is your starting point and initial value for the context's data
    data: []
  })
```
#### Setup
Assuming the place that we want to crawl has an authentication step.
Use the setup to go to the url, log in, and now you no longer need to do that for this session.
```ts
  crawler.setup(async (context) => {
    // go to url
    // log in
    // any other setup steps
  });
```

#### Crawl
This is of course the workhorse of your scraping. You can add as many routine functions to this stage as you like.
Here is where you would get the results of some automated task and then add it to your shared/saved context data.
```ts
  crawler.crawl(async (context) => {
    // scrape to your hearts content
    // add it to your shared data to access anywhere
    context.data = context.data.concat(scrapedResults);
  });
```

#### Paginate
After the crawler has finished the crawl stage, the paginate routines will run in succession and if the result of the LAST routine in the stack is `true`, the crawl stage will repeat. Otherwise the crawler will finish and clean up. 
```ts
  crawler.paginate(async (context) => {
    /** decicde if you want to navigate */
    let goToNext = context.data.length < 20; // if less than 20 results, paginate;

    if(!goToNext){ return false; }

    /** do some work that navigates to the next page */
    await context.browser
      .click('.next-page')
      .wait('.results')
      .run();

    return goToNext;
  });
```

## Real Examples
### StartPage example
```ts

interface StartPageResult {
  title: string,
  href: string,
  description: string,
}

let crawler = new Craler({ data: [] as StartPageResult });

crawler.setup(async context  => {
  await context.browser
    .goto('https://www.startpage.com/')
    .wait('#query')
    .type('#query', 'butter')
    .click('.search-form__button')
    .wait('.w-gl--default .w-gl__result')
    .run();
});
  
crawler.crawl(async context => {
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
});

crawler.paginate(async context => {
  let count = context.data.length;

  if(count < 30){
    await context.browser
      .click('.pagination__next-prev-button.next')
      .wait(1000)
      .run();
  }

  return context.data.length < 30;
});

let result = await crawler.run();

console.log(results);
/*
[
  {
    "desc": "Butter is a dairy product made from the fat and protein components of milk or cream. It is a semi-solid emulsion at room temperature, consisting of approximately ...",
    "href": "https://en.wikipedia.org/wiki/Butter",
    "title": "Butter - Wikipedia"
  },
  {
    "desc": "Sep 9, 2018 ... Butter is made from the milk of mammals and consists of milk solids, proteins, fat, and a little water.",
    "href": "https://www.thespruceeats.com/what-is-butter-1328453",
    "title": "Butter - What It's Made From and the Different Types - The Spruce Eats"
  }
]
*/
```

## Inject Targets
Crawler lets you specify javascript targets to inject if and only if they satisfy a truth test. This truth test will be run inside the browser scope, and falsy values mean that the target WILL be injected.

```ts
  let targets: Target[] = [
    {
      name: 'jQuery',
      src: require.resolve('jquery'),
      test: () => {
        return typeof window.jQuery !== "undefined";
      }
    },
    ...
  ]
```


## Events
Events will come from the context, so access them by using `context.on(event)`

| Event | Description |
| --- | --- |
| `error`   | when an error occurs during the crawl routines handler is `(error: Error, stage: Stage = string) => void` |
| `setup`, `crawl`, `paginate`, `teardown`   | the context will fire an event for each stage it enters stages are setup, crawl, paginate, teardown |
| `request-user-intervention`  | this event will be emitted when crawler has invoked .requestUserIntervention() handler `async (message: UserIntervention.Message, resolve: UserIntervention.Intervention, reject: UserIntervention.Intervention)` you must resolve or reject |

## Requesting User Intervention
Sometimes when crawling pages you might encounter a reCAPTCHA or other forms of blocking that require user input.
While planning out your crawling and you suspect this might happen, add .requestUserIntervention() during one of your crawler routine middlewares like so:
```ts
  crawler.crawl(async context => {
    let needsIntervention = await context.browser.evaluate(() => {
      return document.querySelector('.captcha').length > 0;
    });

    if(needsIntervention){
      // wait for intervention that you handle in other means
      // let the user know what they need to do in order to continue crawling
      await context.requestUserIntervention({
        title: 'Hey, this website has a reCAPTCHA!',
        message: 'Sorry, in order for me to do me, I need you to prove that you\'re human. Yeah. lame I know'
      });
    }
    
    // continue crawling now that you can do so without blockages
    // ...
  });
```

And you can handle the intervention like so:
```ts
  crawler.context.on('request-user-intervention', async (message, resolve, reject) => {
    // show the message to the user in some way shape or form
    console.log(message);

    await context.browser.wait(() => {
      return document.querySelector('.captcha').length === 0;
    }).run();

    // call resolve when you are done or reject if conditions are not met to your standards
    return resolve();
  });
```

## Selectorizor
Crawler is bundled with a powerful tool to assist your scraping. Let's say you are attempting to scrape search page results, and the search result DOM follow a pattern.

Let's look at DuckDuckGo results

https://duckduckgo.com/?q=butter&t=hk&ia=web

Every search result has the class `.result`. Inside every result, the title of the result is located in an `h2` element, and result description is located in the `.result__snippet` element. Now instead of trying to get all of that from an `.evaluate()` function, you can do this:

```ts
  let results = await context.selectorizor({
    root: '.result',
    selectors: {
      title: {
        selector: 'h2'
      },
      link: {
        selector: 'h2 a',
        attr: 'href'
      },
      desc: {
        selector: '.result__snippet'
      }
    }
  });

  console.log(results):
  /**
   *  [
   *     {title: '...', link: '...', desc: '...' },
   *     ...,
   *  ];
   */
```

### Options
`root` - the DOM selector that the Selectorizor will comb through for each result item.

`selectors` - an object of `{[property: string]: Instruction }`. The property name will be the key of the result object returned

#### Instruction
The instruction will tell how Selectorizor should get the information from each of the `root` elements.

`selector: string` - Target the element at the selector *within* the `root`. Gets the text of that element if you do not provide an `attr`.

`attr: string` - In tandem with the `selector`, you can get the attribute value of that element.

`html: boolean` - return the html of the selector instead of the text if true.

`trim: boolean` - trims the result of the selector if true

`iterate: string` - For each element that `iterate` matches, return the text. Returns an array of results.

`fn: function` - Runs a function to transform the value that Selectorizor has returned from the previous options. If using `iterate`, it will perform a `map` on all items.

## Donate
If you find this open-source project useful, consider donating a cup of coffee to keep the good code coming!
BTC: 1HXveyHG5Z3UXnqh2ykFwri3iH87VdMbvi

## License
```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```

Copyright (c) 2020 ugenu.io

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

