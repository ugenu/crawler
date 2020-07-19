import * as Context from "../context.class";
import Options from "./options.interface";
import $, { } from "jquery";
import Logger from '@ugenu.io/logger'
import { ElectrolizerBus } from "@ugenu.io/electrolizer";

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
    //@ts-ignore
    let $ = window.$ as JQueryStatic;
    let root = $(selectorizor.root);
    let results: any[] = [];

    root.each(function(i, e){
      //@ts-ignore
      let dom = window.$(e);
      let result: {[prop: string]: any} = {};

      for(let key in selectorizor.selectors){
        let instructions = selectorizor.selectors[key];
        let useTrim = instructions.trim ? instructions.trim : false;
        let useHtml = instructions.html ? instructions.html : false;

        if(instructions.selector && !instructions.attr){
          let el = dom.find(instructions.selector);
          let text = el.text() ? el.text() : "";
          let html = el.html() ? el.html() : "";
          let value = useHtml ? html : text;
          value = useTrim ? $.trim(value) : value;
          result[key] = value;
        }

        if(instructions.selector && instructions.attr){
          result[key] = dom.find(instructions.selector).attr(instructions.attr);
        }

        if(instructions.iterate){
          //@ts-ignore
          result[key] = dom.find(instructions.iterate).map(function(i, e){
            let el = $(e);
            let text = el.text() ? el.text() : "";
            let html = el.html() ? el.html() : "";
            let value = useHtml ? html : text;
            value = useTrim ? $.trim(value) : value;
            return value;
          }).get();
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
