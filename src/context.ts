import { CrawlerConstructorOptions } from "./crawler";
import Nightmare from "nightmare";
import extend from 'extend';
import { Evaluate } from "./evaluate";


export interface MiddlewareContext {
  [prop: string]: any,
  session: Nightmare,
  evaluate: typeof Evaluate
}

export function MiddlewareContext(crawlerOptions: CrawlerConstructorOptions, contextOptions: {[prop: string]: any}): MiddlewareContext {

  let shared: MiddlewareContext = {
    session: new Nightmare(crawlerOptions.nightmare),
    evaluate: function(){}
  };

  shared.evaluate = Evaluate.bind(shared.session); 

  return extend(true, shared, contextOptions);
}

export default MiddlewareContext;