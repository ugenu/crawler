import { Message } from "./message.interface";
import { DefaultMessage } from "./default.message";
import { Context } from "..";
import { Intervention } from "./intervention.interface";
import Logger from '@ugenu.io/logger'

const logger = Logger(['crawler', 'context', 'intervention'], process.env.DEBUG ? "debug" : "info");

/**
 * emit a request that the user needs to interact with the browser before crawling can continue
 * @param context 
 * @param message 
 */
export async function Request<T>(context: Context<T>, message?: Message, timeout?: number): Promise<void>{
  /** make the request message the default if one was not passed upon invoking */
  let requestMessage = message ? message : await DefaultMessage(context);

  /** use the timeout provided, otherwise use the context's timeout option */
  let rejectTimeout = timeout ? timeout : context.userInterventionTimeout
  
  return await new Promise<void>(function(resolve, reject){
    /** our boolean for checking if the script handled intervention or not */
    let intervened = false;

    /** our wrapper that sets the intervened boolean when either reject or resolve is called */
    let wrapper = function(fn: any): Intervention {
      return function intervene(reason?: any | void){
        intervened = true;

        return fn(reason);
      }
    };
    
    /** emit the event but find out if there was anyone listening */
    let hasListeners = context.emit('request-user-intervention', requestMessage, wrapper(resolve), wrapper(reject));

    /** if no listeners we should warn the user, but otherwise continue */
    if(!hasListeners){
      logger.warn('no listeners for user intervention. This will be an error soon.')
      return resolve();
    }

    setTimeout(() => {
      /** if some sort of intervention occurred then we don't need to do anything */
      if(intervened){ return };

      /** otherwise lets reject the promise so we can throw an error */
      return reject('user intervention did not happen in time');

    }, rejectTimeout);
  });
}