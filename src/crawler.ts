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
  setup: Middleware = new Middleware()
  crawl: Middleware = new Middleware()
  teardown: Middleware = new Middleware()
  
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

  private teardownAddition(context: MiddlewareContext, callback: MiddlewareInstructionCallback){
    context.session.end().then(callback).catch(callback);
  }

  private runMiddleware(context: MiddlewareContext, middleware: Middleware, index: number, callback: MiddlewareRunCallback){
    middleware.run(context, callback);
  }

  private prepareForRun(){
    this.teardown.use(this.teardownAddition);
  }

  public run(contextOptions: {[prop: string]: any}, callback: CrawlerRunCallback){
    let context = MiddlewareContext(this.options, contextOptions);
    this.prepareForRun();
    eachOfSeries([this.setup, this.crawl, this.teardown], this.runMiddleware.bind(this, context), function(error){
      return callback(error, context);
    });
  }
}

export default Crawler;