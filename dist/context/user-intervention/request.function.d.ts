import { Message } from "./message.interface";
import { Context } from "..";
/**
 * emit a request that the user needs to interact with the browser before crawling can continue
 * @param context
 * @param message
 */
export declare function Request<T>(context: Context<T>, message?: Message, timeout?: number): Promise<void>;
