import * as Context from "../context";
import * as Routine from '../routine';
export declare class Runner {
    protected routines: Routine.Routines;
    constructor(routines: Routine.Routines);
    /**
     * runs the setup routine with the supplied context
     * attempts to handle errors
     * @param context
     */
    setup<T>(context: Context.Context<T>): Promise<void>;
    /**
     * runs the crawl routine with the supplied context while also paginating (if necessary)
     * attempts to handle errors
     * @param context
     */
    crawl<T>(context: Context.Context<T>): Promise<void>;
    /**
     * runs the paginate routine if it was supplied
     * if an error occurs paginate will return false which stops crawling
     * @param context
     */
    paginate<T>(context: Context.Context<T>): Promise<boolean>;
    /**
     * tears down the context and performs any clean up
     * @param context
     */
    teardown<T>(context: Context.Context<T>): Promise<void>;
    /**
     * takes an existing context object and runs the
     * @param context
     */
    runContext<T>(context: Context.Context<T>): Promise<void>;
    /**
     * takes new context options, creates a context and runs the routines for it
     * may be removed / deprecated soon
     * @param options
     */
    run<B, T>(options: Context.Options<T>): Promise<Context.Context<T>>;
}
export default Runner;
