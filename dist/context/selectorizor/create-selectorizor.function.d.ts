import { Context } from "../context.class";
import { Options } from "./options.interface";
import { ElectrolizerBus } from "@ugenu.io/electrolizer";
export declare type SelectorizorContextInjected = <O, R>(options: Options, _: R) => Promise<R[]>;
export declare function CreateSelectorizor<C, K extends ElectrolizerBus>(context: Context<C>): <O, R>(options: Options, _: R) => Promise<R[]>;
