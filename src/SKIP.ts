/**
 * when the SKIP error is encountered in an async action
 * dispatcher, the action dispatched will not dispatch
 * the `error` action, assuming it already has been. 
 * This is useful for dispatching an error early and not
 * having the action dispatcher dispatch it a second time.  
 */
const SKIP = new Error('SKIP');

export default SKIP;