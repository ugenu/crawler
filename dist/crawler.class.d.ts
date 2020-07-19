import { Context, Options as ContextOptions } from "./context";
import { Middleware } from './routine';
import { Runner } from './runner';
/**
 * the crawler class, simplified and ready to use
 */
export declare class Crawler<T> {
    protected options: ContextOptions<T>;
    constructor(options: ContextOptions<T>);
    /** the shared context object, gets refreshed each run for memory sake */
    readonly context: Context<T>;
    /** the runner class that we will be using to run the routines; overridable */
    runner: typeof Runner;
    private routines;
    /**
     * add a setup middleware that will run ONCE before crawling
     * @example
     *  crawler.setup(async context => {
     *    // perform any login or form submission
     *  });
     * @param routine
     */
    setup(routine: Middleware<void, T>): void;
    /**
     * add a crawl middleware that will run in order of insertion
     * any manipulation of the data can be done here and that is what .run() will return
     * @example
     *  crawler.crawl(async context => {
     *    //make any requests that extract data
     *    context.data.push(result);
     *  });
     * @param routine
     */
    crawl(routine: Middleware<void, T>): void;
    /**
     * add a pagination middleware that will determine if you should crawl again
     * return TRUE if you want to crawl again (last middleware should return true as well)
     * return false if there is no need to perform the crawl routine(s) again
     * also use this to navigate to the next page for results by clicking any links/submitting any forms within the browser or http context
     * @example
     *  crawler.paginate(async context => {
     *    if(context.data.length > 30){ return true; }
     *    await context.browser.click('.next-page').wait('.results');
     *    return false;
     *  });
     * @param routine
     */
    paginate(routine: Middleware<boolean, T>): void;
    /**
     * runs the crawler routine applying the shared context and returning the data
     * will probably impliment metrics to return that instead
     */
    run(): Promise<T>;
}
export default Crawler;
