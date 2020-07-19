import { AxiosRequestConfig } from "axios";
import * as Inject from './inject'
import { ElectrolizerBus } from '@ugenu.io/electrolizer';

/**
 * options when creating the context to apply to the http and browser
 */
export interface Options<T = null> {
  /**
   * options for the http requester, like cookies, etc
   */
  http?: AxiosRequestConfig

  /**
   * options for the browser like showing the window, etc
   */
  browser?: ElectrolizerBus,

  /**
   * targets to inject if we have any
   */
  inject?: Inject.Target[],

  /**
   * optional data to pass into the context
   */
  data?: T

  /**
   * the timeout we will wait for user intervention when requested
   */
  userInterventionTimeout?: number
}

export default Options;