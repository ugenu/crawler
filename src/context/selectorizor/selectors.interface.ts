import { Instruction } from "./instruction.interface";

/**
 * a key-value list of instructions to run when selectorizing
 */
export interface Selectors {
  [prop: string]: Instruction
}