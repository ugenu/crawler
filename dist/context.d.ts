import { CrawlerConstructorOptions } from "./crawler";
import Nightmare from "nightmare";
import { Evaluate } from "./evaluate";
export interface MiddlewareContext {
    [prop: string]: any;
    session: Nightmare;
    evaluate: typeof Evaluate;
}
export declare function MiddlewareContext(crawlerOptions: CrawlerConstructorOptions, contextOptions: {
    [prop: string]: any;
}): MiddlewareContext;
export default MiddlewareContext;
