import * as Context from "../context.class";
import Options from "./options.interface";
import Logger from '@ugenu.io/logger'


const logger = Logger(['crawler', 'context', 'selectorizor'], process.env.DEBUG ? "debug" : "info");

export async function Selectorizor<O, C, R>(options: Options, context: Context.Context<C>, _: R): Promise<R[]>{
  logger.http('browser currently on %s', await context.browser.evaluate(() => window.location.href ));
  logger.debug(`running selectorizor with options %o`, options);
  for(let key in options.selectors){
    let instruction = options.selectors[key];
    //@ts-ignore
    instruction.fn = instruction.fn ? String(instruction.fn) : false;
  }

  return await context.browser.evaluate(function(selectorizor: Options){

    let root = document.querySelectorAll(selectorizor.root);
    let results: any[] = [];

    root.forEach(function(e, i){
      
      let dom = e;

      let result: {[prop: string]: any} = {};

      for(let key in selectorizor.selectors){
        let instructions = selectorizor.selectors[key];
        let useTrim = instructions.trim ? instructions.trim : false;
        let useHtml = instructions.html ? instructions.html : false;

        if(instructions.selector && !instructions.attr){
          let el = dom.querySelector(instructions.selector);
          if(el){
            let text = el.textContent ? el.textContent : "";
            let html = el.innerHTML ? el.innerHTML : "";
            let value = useHtml ? html : text;
            value = useTrim ? value.trim() : value;
            result[key] = value;
          }
        }

        if(instructions.selector && instructions.attr){
          let el = dom.querySelector(instructions.selector);
          if(el){
            result[key] = el.getAttribute(instructions.attr);
          }
        }

        if(instructions.iterate){
          let els = dom.querySelectorAll(instructions.iterate);
          
          let value: string[] = [];

          els.forEach((el, i) => {
            let text = el.textContent ? el.textContent : "";
            let html = el.innerHTML ? el.innerHTML : "";
            let innerValue = useHtml ? html : text;
            innerValue = useTrim ? innerValue.trim() : innerValue;
            value.push(innerValue);
          });

          result[key] = value;
        }

        if(instructions.fn){
          let fn: (value: any) => any = function(value: any){}
          eval(`fn = ${instructions.fn}`);

          if(instructions.iterate){
            result[key] = result[key].map(fn);
          } else {
            result[key] = fn(result[key]);
          }
        }
      }

      results.push(result);
    })

    return results;
  }, options);
}
