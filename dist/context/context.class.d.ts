/// <reference types="cheerio" />
/// <reference types="node" />
import { Options } from "./options.interface";
import { EventEmitter } from "events";
import { AxiosInstance } from "axios";
import { Electrolizer } from '@ugenu.io/electrolizer';
import * as Selectorizor from "./selectorizor";
import * as Routines from '../routine';
import * as UserIntervention from "./user-intervention";
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
    on(event: Routines.Stages, handler: () => void): this;
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
    emit(event: 'request-user-intervention', message: UserIntervention.Message, resolve: UserIntervention.Intervention, reject: UserIntervention.Intervention): boolean;
}
export declare class Context<T> extends EventEmitter {
    protected options?: Options<T> | undefined;
    /**
     * the http module to request pages / crawl
     */
    http: AxiosInstance;
    /**
     * the (headless) browser module capable of making browser crawling
     */
    browser: Electrolizer<any>;
    /**
     * custom module to return an array of scraped values based on rules
     * @see Selectorizor.Instruction
     */
    selectorizor: Selectorizor.SelectorizorContextInjected;
    /**
     * optional data to be preserved throughout the crawling process
     */
    data: T;
    /**
     * timeout to wait for user intervention
     */
    userInterventionTimeout: number;
    private inject;
    constructor(options?: Options<T> | undefined);
    private defaultElectrolizerBus;
    /**
     * applies the user options to context options
     */
    private applyOptions;
    /**
     * injects the targets that were created during construction
     */
    injectTargets(): Promise<number>;
    /**
     * powerhouse function that allows for intervention in case the crawlr cannot proceed
     * emits the 'request-user-intervention' event with the promise resolve and reject handlers
     * use this event to open up the contexts browser and complete a CAPTCHA, etc. run the resolve to finish and resume crawling
     * @emits request-user-intervention
     */
    requestUserIntervention(message?: UserIntervention.Message, timeout?: number): Promise<void>;
    /**
     * resets the context
     * can remove listeners with the hard option (probably shouldn't)
     * @param hard
     */
    reset(hard?: boolean): Promise<void>;
    /**
     * tears down the browser context
     */
    teardown(): Promise<void>;
    /**
     * async delay function
     * @param ms
     */
    delay(ms: number): Promise<void>;
    /**
     * gets the current browser html
     */
    html(): Promise<string>;
    /**
     * turns the html (provided or from browser) into a cheerio instance
     * @param providedHtml
     */
    $(providedHtml?: string): Promise<CheerioStatic>;
}
