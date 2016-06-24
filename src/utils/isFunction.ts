/**
 * 
 * ```
 * (*)=>boolean
 * ```
 * 
 * Returns true if the passed object is function
 * 
 * @param {*} thing
 * @returns {boolean}
 */
export default function isFunction(thing:any):thing is Function{
	return (thing && (typeof thing == 'function'));
}