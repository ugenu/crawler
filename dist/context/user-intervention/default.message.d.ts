import { Context } from "..";
import { Message } from "./message.interface";
export declare function DefaultMessage<T>(context: Context<T>): Promise<Message>;
