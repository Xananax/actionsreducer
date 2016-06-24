import isObject from '../utils/isObject';

/**
 * 
 * ```
 * (*)=>boolean
 * ```
 * 
 * Returns true if the passed object has an `actions` property
 * and a `state` property.
 * 
 * @param {*} thing
 * @returns {boolean}
 */
export default function isStateChunk(thing:any):thing is AR_Conf.StateChunk{
	return (
		isObject(thing) &&
		('actions' in thing) &&
		('state' in thing)
	)
}