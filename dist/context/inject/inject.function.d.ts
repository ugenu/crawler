import * as Context from '../../context';
import { Target } from "./target.interface";
/**
 * Function to inject browser context with javascript libraries if the target.test is false
 * Returns the number of targets that were injected
 * @param targets
 * @param context
 */
export declare function Inject<T>(targets: Target[], context: Context.Context<T>): Promise<number>;
