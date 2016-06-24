import isFunction from '../utils/isFunction';

/**
 * 
 * ```
 * (*)=>boolean
 * ```
 * Returns `true` if the passed object is a function
 * 
 * @param {*} thing
 * @returns {boolean}
 */
export default function isActionProcessor(thing:any):thing is AR_Conf.ActionProcessor{
	return isFunction(thing);
}