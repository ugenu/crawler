import * as Context from "../context";
import * as Routine from '../routine';

export class Runner {
  constructor(protected routines: Routine.Routines){}

  /**
   * runs the setup routine with the supplied context
   * attempts to handle errors
   * @param context 
   */
  async setup<T>(context: Context.Context<T>){
    context.emit('setup');
    try {
      for(let middleware of this.routines.setup){
        await middleware(context);
      }
    } catch (error){
      console.log(error);
      context.emit('error', error, 'setup');
    } 
  }

  /**
   * runs the crawl routine with the supplied context while also paginating (if necessary)
   * attempts to handle errors
   * @param context 
   */
  async crawl<T>(context: Context.Context<T>){
    do {
      try {
        await context.injectTargets();
        context.emit('crawl');
        for(let middleware of this.routines.crawl){
          await middleware(context);
        }
      } catch (error){
        context.emit('error', error, 'crawl');
      }

    } while(await this.paginate(context));
  }

  /**
   * runs the paginate routine if it was supplied
   * if an error occurs paginate will return false which stops crawling
   * @param context 
   */
  async paginate<T>(context: Context.Context<T>): Promise<boolean> {
    try {
      context.emit('paginate');
      
      for(let middleware of this.routines.paginate){
        let result = await middleware(context);
        if(!result){ return false }
      }

      return this.routines.paginate.length > 0;
    } catch(error){
      context.emit('error', error, 'paginate');
      return false;
    }
  }

  /**
   * tears down the context and performs any clean up
   * @param context 
   */
  async teardown<T>(context: Context.Context<T>){
    try {
      context.emit('teardown');
      await context.teardown();
    } catch(error){
      context.emit('error', error, 'teardown');
    }
  }

  /**
   * takes an existing context object and runs the 
   * @param context 
   */
  async runContext<T>(context: Context.Context<T>){
    await this.setup(context);
    await this.crawl(context);
    await this.teardown(context);
  }

  /**
   * takes new context options, creates a context and runs the routines for it
   * may be removed / deprecated soon
   * @param options 
   */
  async run<B, T>(options: Context.Options<T>): Promise<Context.Context<T>> {
    let context = new Context.Context(options);
    await this.runContext(context);
    return context;
  }
}

export default Runner;