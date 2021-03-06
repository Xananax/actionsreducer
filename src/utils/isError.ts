/**
 * 
 * ```
 * (*)=>boolean
 * ```
 * 
 * Returns true if the passed object is an Error
 * 
 * @param {any} thing
 * @returns {boolean}
 */
export default function isError(thing:any):thing is Error{
	return (
		(thing != null) &&
		(thing instanceof Error)
	);
}