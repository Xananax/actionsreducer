import isFunction from './isFunction';

/**
 * ```
 * (*)=>boolean
 * ```
 * Returns true if the passed object has a `then` method
 * 
 * @param {any} thing
 * @returns {boolean}
 */
export default function isThenable(thing:any):thing is PromiseLike<any>{
	return (
		(thing != null) &&
		('then' in thing) &&
		(isFunction(thing.then))
	);
}