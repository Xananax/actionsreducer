import isObject from '../utils/isObject';
import isFunction from '../utils/isFunction';

/**
 * 
 * ```
 * (*)=>boolean
 * ```
 * 
 * Returns true if the passed object:
 * 
 *  - has a "_" property that is a function
 *  - has a "success" property that is a function 
 * 
 * @param {*} thing
 * @returns {boolean}
 */
export default function isAsyncActionProcessor(thing:any):thing is AR_Conf.AsyncActionProcessor{
	return (
		isObject(thing) &&
		('_' in thing) &&
		(isFunction(thing._)) &&
		('success' in thing) &&
		(isFunction(thing.success))
	)
}