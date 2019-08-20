import { EventEmitter } from "events";
import Middleware, { MiddlewareRunCallback, MiddlewareInstructionCallback } from "./middleware";
import Nightmare, { IConstructorOptions } from "nightmare";
import extend from 'extend'
import { eachSeries, eachOfSeries } from "async";
import { MiddlewareContext } from "./context";

export interface CrawlerRunCallback {
  (error: Error | undefined | null, context: MiddlewareContext): void;
}

export interface CrawlerConstructorOptions {
  [prop: string]: any,
  nightmare?: IConstructorOptions
}

export interface CrawlerSteps {
  setup: Middleware,
  crawl: Middleware,
  teardown: Middleware
}

export class Crawler extends EventEmitter {
  /**
   * our public middleware instructions separated by steps
   */
  setup: Middleware = new Middleware();
  crawl: Middleware = new Middleware();
  pagination: Middleware = new Middleware();
  
  /**
   * our options object
   */
  options: CrawlerConstructorOptions = this.defaultOptions;

  /**
   * constructs the crawler object
   * @param options 
   */
  constructor(options?: CrawlerConstructorOptions){
    super();
    this.options = extend(true, this.defaultOptions, options);
  }

  /**
   * our default options
   */
  private get defaultOptions(): CrawlerConstructorOptions {
    return {
      nightmare: {},
    }
  }

  private modifyMiddlewareForEvents(middleware: Middleware, step: string): Middleware{
    let self = this;
    let newMiddleware = new Middleware();

    newMiddleware.import(middleware);

    newMiddleware.before(function(context, callback){
      self.emit(`begin:${step}`, context);
      callback();
    });

    newMiddleware.use(function(context, callback){
      self.emit(`end:${step}`, context);
      callback();
    });

    return newMiddleware;
  }

  /**
   * our private middleware that combines the crawl and pagination into one
   */
  private get crawlAndPagination(): Middleware {
    let middleware = new Middleware();
    middleware.import(this.modifyMiddlewareForEvents(this.crawl, 'crawl'));
    middleware.import(this.modifyMiddlewareForEvents(this.pagination, 'pagination'));
    return middleware;
  }

  /**
   * our private teardown middleware
   * made private because we should handle the closing of nightmare 
   */
  private get teardown(): Middleware {
    let middleware = new Middleware();
    middleware.use(function(context, callback){
      context.session.end().then(callback).catch(callback);
    });
    return middleware;
  }

  /**
   * this is here because I am lazy and I think it looks nicer
   */
  private get middlewareStack(): Middleware[] {
    return [
      this.modifyMiddlewareForEvents(this.setup, 'setup'),
      this.crawlAndPagination,
      this.modifyMiddlewareForEvents(this.teardown, 'teardown')
    ];
  }

  private runMiddleware(context: MiddlewareContext, middleware: Middleware, index: number, callback: MiddlewareRunCallback){
    middleware.run(context, callback);
  }

  public run(contextOptions: {[prop: string]: any}, callback: CrawlerRunCallback){
    let context = MiddlewareContext(this.options, contextOptions);
    eachOfSeries(this.middlewareStack, this.runMiddleware.bind(this, context), function(error){
      return callback(error, context);
    });
  }
}

export default Crawler;