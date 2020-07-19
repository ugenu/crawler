import { Selectors } from "./selectors.interface";
export interface Options {
    /**
     * the root dom element to iterate over and selectorize
     * lets say you're on a search page with 10 .result doms, .result is your root,
     * and the selector instructions will be performed for each .result dom element
     */
    root: string;
    /**
     * the selectors and their instructions
     */
    selectors: Selectors;
}
export default Options;
