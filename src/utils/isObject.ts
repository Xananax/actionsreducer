/**
 * 
 * ```
 * (*)=>boolean
 * ```
 * 
 * Verifies the passed object is of the 'object' family.
 * 
 * Does not verify if the passed object is a plain object,
 * so `Date`s and other class instances will return true.
 * 
 * @param {any} thing
 * @returns {boolean}
 */
export default function isObject(thing:any):thing is Object{
	return (thing && typeof thing == 'object');
}