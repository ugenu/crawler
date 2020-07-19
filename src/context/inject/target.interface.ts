/**
 * Injects a javascript library if the test fails
 */
export interface Target {
  /**
   * name of the library that would be injected (for logging / debugging)
   */
  name: string

  /**
   * the sync test to perform if true, do not inject, if false, inject the src
   */
  test: () => boolean,
  
  /**
   * fully qualified path name to javascript src code
   */
  src: string,
}