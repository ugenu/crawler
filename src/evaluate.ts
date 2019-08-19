import Nightmare, {  } from "nightmare";

interface EvaluateFunction {
  (...args:any): unknown;
}

export interface EvaluateCallback {
  (error?: Error | undefined | null, results?: any): void;
}

/**
 * @this {Nightmare}
 * @param fn 
 * @param options 
 * @param callback 
 */
export function Evaluate(fn: EvaluateFunction, options: {[prop: string]: any}, callback: EvaluateCallback): void;
export function Evaluate(fn: EvaluateFunction, callback: EvaluateCallback): void;
export function Evaluate(fn: EvaluateFunction, callback: EvaluateCallback): void {
  let self = this as Nightmare;
  let cb = callback;
  let options = {};
  if(arguments.length === 3){
    cb = arguments[2] as EvaluateCallback;
    options = arguments[1];
  }
  self
    //@ts-ignore
    .evaluate(fn, options)
    .then(function(result){
      return cb(undefined, result);
    })
    .catch(cb);
}

export default Evaluate;