import { Context } from "..";
import { Message } from "./message.interface";

export async function DefaultMessage<T>(context: Context<T>): Promise<Message> {
  return {
    title: 'User intervention required!',
    message: `Crawler script has requested that you provide user input in order to continue crawling.`
  }
}