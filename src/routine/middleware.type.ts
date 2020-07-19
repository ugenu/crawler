import * as Context from "../context";

/**
 * the middleware type of each function that will be a part of our routine
 */
export type Middleware<T, C> = (context: Context.Context<C>) => Promise<T>;