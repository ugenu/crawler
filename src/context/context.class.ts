import { Options } from "./options.interface";
import { EventEmitter } from "events";
import axios, { AxiosInstance } from "axios";
import { load } from "cheerio";
import { Electrolizer } from '@ugenu.io/electrolizer';
import * as Selectorizor from "./selectorizor";
import * as Inject from "./inject";
import * as Routines from '../routine'
import Logger from '@ugenu.io/logger'
import * as UserIntervention from "./user-intervention";
import { WebviewTag, webviewTag } from "electron";

const logger = Logger(['crawler', 'context'], process.env.DEBUG ? "debug" : "info");

export declare interface Context<T> {
  /**
   * the event that will be emitted when a user needs to intervene
   * @param event 
   * @param handler 
   */
  on(event: 'request-user-intervention', handler: (this: Context<T>, message: UserIntervention.Message, resolve: UserIntervention.Intervention, reject: UserIntervention.Intervention) => Promise<void>): this;

  /**
   * the error event when an error occurs during the crawling process
   * @param event 
   * @param handler 
   */
  on(event: 'error', handler: (error: Error, stage: Routines.Stages) => void): this;

  /**
   * the event that will occur when the context reaches different stages while being run
   * @param event 
   * @param handler 
   */
  on(event: Routines.Stages, handler: () => void): this
  
  /**
   * 
   * @param event 
   * @param handler 
   */
  on(event: string, handler: Function): this;

  /**
   * 
   * @param event 
   */
  emit(event: Routines.Stages): boolean;

  /**
   * 
   * @param event 
   * @param error 
   * @param stage 
   */
  emit(event: 'error', error: Error, stage: Routines.Stages): boolean;

  /**
   * What the context will emit when a the user needs to interact with the browser
   * @param event 
   * @param message 
   * @param resolve 
   * @param reject 
   */
  emit(event: 'request-user-intervention', message:  UserIntervention.Message, resolve: UserIntervention.Intervention, reject: UserIntervention.Intervention): boolean;
}

export class Context<T> extends EventEmitter {
  /**
   * the http module to request pages / crawl
   */
  http!: AxiosInstance

  /**
   * the (headless) browser module capable of making browser crawling
   */
  browser!: Electrolizer<any>

  /**
   * custom module to return an array of scraped values based on rules
   * @see Selectorizor.Instruction
   */
  selectorizor!: Selectorizor.SelectorizorContextInjected

  /**
   * optional data to be preserved throughout the crawling process
   */
  data!: T

  /**
   * timeout to wait for user intervention
   */
  userInterventionTimeout: number = 1000 * 60 * 60;
  
  private inject!: Inject.Target[]

  constructor(protected options?: Options<T>){
    super();
    this.applyOptions();
  }

  private defaultElectrolizerBus(): WebviewTag {
    return webviewTag;
  }

  /**
   * applies the user options to context options
   */
  private applyOptions(){
    logger.debug(`applying options %o`, this.options);
    let axiosOptions = this.options ? this.options.http || {} : {};
    let electrolizerBus = this.options ? this.options.browser || this.defaultElectrolizerBus() : this.defaultElectrolizerBus();
    let injectOptions = this.options? this.options.inject || [] : [];

    this.inject = injectOptions;
    this.http = axios.create(axiosOptions);
    
    this.browser = new Electrolizer(electrolizerBus);
    this.selectorizor = Selectorizor.CreateSelectorizor(this);
    
    if(this.options && this.options.data){
      this.data = this.options.data;
    }

    if(this.options && this.options.userInterventionTimeout){ this.userInterventionTimeout = this.options.userInterventionTimeout };
  }

  /**
   * injects the targets that were created during construction
   */
  async injectTargets(): Promise<number> {
    let targets = [...this.inject];

    logger.verbose('adding jquery to injection targets');
    
    targets.push({
      src: require.resolve('jquery'),
      name: 'jQuery',
      test: function(){
        //@ts-ignore
        window.noGlobal = false;
        //@ts-ignore
        let exists = typeof window.jQuery !== "undefined";
        return exists;
      }
    });

    return await Inject.Inject(targets, this);
  }

  /**
   * powerhouse function that allows for intervention in case the crawlr cannot proceed
   * emits the 'request-user-intervention' event with the promise resolve and reject handlers
   * use this event to open up the contexts browser and complete a CAPTCHA, etc. run the resolve to finish and resume crawling
   * @emits request-user-intervention
   */
  async requestUserIntervention(message?: UserIntervention.Message, timeout?: number){
    await UserIntervention.Request(this, message, timeout);
  }

  /**
   * resets the context 
   * can remove listeners with the hard option (probably shouldn't)
   * @param hard 
   */
  async reset(hard: boolean = false){
    logger.verbose('resetting the context');
    await this.teardown();
    if(hard){ this.removeAllListeners() }
    this.applyOptions();
  }

  /**
   * tears down the browser context
   */
  async teardown(): Promise<void>{
    logger.verbose('tearing down browser');
    await this.browser.end();
  }

  /**
   * async delay function
   * @param ms 
   */
  async delay(ms: number): Promise<void> {
    await new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  }

  /**
   * gets the current browser html
   */
  async html(): Promise<string>{
    return await this.browser.html();
  }

  /**
   * turns the html (provided or from browser) into a cheerio instance
   * @param providedHtml 
   */
  async $(providedHtml?: string): Promise<CheerioStatic>{
    let html = providedHtml ? providedHtml : await this.html();
    return load(html);
  }
}

