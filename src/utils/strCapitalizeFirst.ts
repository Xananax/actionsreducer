/**
 * 
 * ```
 * (''|''[],''?)=>''
 * ```
 * 
 * Capitalizes the first letter of a string
 * or an array of strings.
 * 
 * If passed an array, the function will join them
 * with the `sep` argument.
 * 
 * @param {(string|string[])} str
 * @param {string} [sep='.']
 * @returns {string}
 */
export default function capitalizeFirstLetter(str:string|string[],sep:string='.'):AR_Conf.CapitalizedString{
	if(Array.isArray(str)){
		return str.map(s=>capitalizeFirstLetter(s,sep)).filter(Boolean).join(sep);
	}
	else{
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
}