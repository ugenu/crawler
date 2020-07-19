/**
 * important data about the routine running that will be available
 */
export interface Metrics {
  /**
   * when the routine started running
   */
  started: string,

  /**
   * when the routine stopped running
   */
  completed: string,

  /**
   * number of "pages" the routine crawled
   */
  crawled: number,

  /**
   * number of "pages" the routine calculated
   * SHOULD be Metrics.crawled - 1
   */
  paginated: number
}