import * as Context from '../../context';
import { Target } from "./target.interface";
import Logger from '@ugenu.io/logger'
import { ElectrolizerBus } from '@ugenu.io/electrolizer';

const logger = Logger(['crawler', 'context', 'inject'], process.env.DEBUG ? "debug" : "info");

/**
 * Function to inject browser context with javascript libraries if the target.test is false
 * Returns the number of targets that were injected
 * @param targets 
 * @param context 
 */
export async function Inject<T>(targets: Target[], context: Context.Context<T>): Promise<number> {
  logger.debug('attempting to get browser url');

  //@ts-ignore
  let state = context.browser.state as string;

  if(state === "initial"){
    logger.info('no web page to inject scripts');
    return 0;
  }

  let url = await context.browser.evaluate(() => window.location.href);

  logger.http(`browser on %s`, url);

  let injected = 0;

  for(let target of targets){
    logger.verbose(`testing injection target ${target.name}`);

    let result = await context.browser.evaluate(target.test);
    
    if(!result){
      logger.verbose(`test failed, inject ${target.name}`);
      try {
        await context.browser.inject('js', target.src).run();
      } catch (error) {
        console.log(error);
      }
      injected++;
    } else {
      logger.verbose(`test passed, will NOT inject ${target.name}`);
    }
  }

  return injected;
}