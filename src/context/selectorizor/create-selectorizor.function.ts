import { Context } from "../context.class";
import { Selectorizor } from "./selectorizor.function"
import { Options } from "./options.interface";
import { ElectrolizerBus } from "@ugenu.io/electrolizer";

export type SelectorizorContextInjected = <O, R>(options: Options, _:R) => Promise<R[]>;

export function CreateSelectorizor<C, K  extends ElectrolizerBus>(context: Context<C>){
  return function selectorizor<O, R>(options: Options, _:R){
    return Selectorizor(options, context, _);
  }
}
