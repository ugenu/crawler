/**
 * the options for running a selectorizor instruction
 */
export interface Instruction {
    /**
     * whether or not to trim the found data
     */
    trim?: boolean;
    /**
     * whether or not to return the html value of the selector
     */
    html?: boolean;
    /**
     * get the attribute value only
     */
    attr?: string;
    /**
     * only look for a single value that fits this selector
     */
    selector?: string;
    /**
     * if provided, will go through each element that fits this selector
     */
    iterate?: string;
    /**
     * function to run on result before it gets saved
     */
    fn?: (value: any) => any;
}
