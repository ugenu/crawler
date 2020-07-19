import { Middleware } from "./middleware.type";
/**
 * The routines object that will be user-defined to crawl the web
 */
export interface Routines<C = any> {
    /**
     * the middleware that will run ONCE before crawling
     * use this to make any requests, set up the browser session, etc
     */
    setup: Middleware<void, C>[];
    /**
     * the middleware that will run for each page (each time Routines.paginate returns true)
     * this will be where the magic scraping happens
     */
    crawl: Middleware<void, C>[];
    /**
     * the middleware that will run after each Routines.crawl
     * perform what operations you need to, and then return true to crawl again
     * or return false to stop crawling and exit the routine
     */
    paginate: Middleware<boolean, C>[];
}
