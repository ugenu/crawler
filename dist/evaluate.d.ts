interface EvaluateFunction {
    (): unknown;
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
export declare function Evaluate(fn: EvaluateFunction, options: {
    [prop: string]: any;
}, callback: EvaluateCallback): void;
export declare function Evaluate(fn: EvaluateFunction, callback: EvaluateCallback): void;
export default Evaluate;
