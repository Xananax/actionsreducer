import isThenable from './isThenable'
import isFunction from './isFunction';


/**
 * 
 * ```
 * (*)=>boolean
 * ```
 * 
 * Returns true if the passed object has a `then` method
 * and a `catch` method
 *  
 * @param {*} thing
 * @returns {boolean}
 */
export default function isPromise(thing:any):thing is Promise<any>{
	return (
		isThenable(thing) &&
		('catch' in thing) &&
		(isFunction(thing.catch))
	)
}