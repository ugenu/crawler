import { eachSeries, ErrorCallback } from "async";

import { MiddlewareContext } from "./context";

export interface MiddlewareInstructionCallbackOptions {
  [prop: string]: any
  restart?: boolean
}

export interface MiddlewareInstructionCallback {
  (error?: Error | undefined | null, options?: MiddlewareInstructionCallbackOptions): void;
}

export interface MiddlewareInstruction {
  (context: MiddlewareContext, callback: MiddlewareInstructionCallback): void;
}

export interface MiddlewareRunCallback {
  (error?: Error | undefined | null): void;
}


export class Middleware {
  public instructions: MiddlewareInstruction[] = [];

  public get length(): number {
    return this.instructions.length;
  }

  public import(middleware: Middleware){
    this.instructions = this.instructions.concat(middleware.instructions);
  }

  public use(instruction: MiddlewareInstruction | MiddlewareInstruction[]): void {
    if(Array.isArray(instruction)){
      return (instruction as MiddlewareInstruction[]).forEach(this.use.bind(this));
    }

    if(typeof instruction !== "function"){
      throw new Error('instruction must be a function');
    }

    this.instructions.push(instruction);
  }

  public before(instruction: MiddlewareInstruction | MiddlewareInstruction[]): void {
    if(Array.isArray(instruction)){
      return (instruction as MiddlewareInstruction[]).reverse().forEach(this.before.bind(this));
    }

    if(typeof instruction !== "function"){
      throw new Error('instruction must be a function');
    }

    this.instructions.unshift(instruction);
  }

  private middlewareCallbackHandler(context: MiddlewareContext, callback: ErrorCallback<Error>, error?: Error | undefined | null, options?: any): void {
    if(error){
      return callback(error);
    }

    if(options){
      if(options.restart){
        return this.run(context, callback);
      }
    }

    return callback();
  }

  private middlewareIterator(context: MiddlewareContext, instruction: MiddlewareInstruction, callback: ErrorCallback<Error>){
    try {
      instruction(context, this.middlewareCallbackHandler.bind(this, context, callback));
    } catch(error){
      return callback(error);
    }
  }

  public run(context: MiddlewareContext, callback: MiddlewareRunCallback): void {
    eachSeries(this.instructions, this.middlewareIterator.bind(this, context), callback);
  }
}

export default Middleware;