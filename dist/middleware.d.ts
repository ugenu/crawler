import { MiddlewareContext } from "./context";
export interface MiddlewareInstructionCallbackOptions {
    [prop: string]: any;
    restart?: boolean;
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
export declare class Middleware {
    instructions: MiddlewareInstruction[];
    readonly length: number;
    use(instruction: MiddlewareInstruction | MiddlewareInstruction[]): void;
    private middlewareCallbackHandler;
    private middlewareIterator;
    run(context: MiddlewareContext, callback: MiddlewareRunCallback): void;
}
export default Middleware;
