
/**
 * ```
 * (''|''[],''?)=>''
 * ```
 * 
 * lowercases the first letter of a string
 * or of each word in an array of strings. 
 * 
 * @param {(string|string[])} str
 * @param {string} [sep='']
 * @returns {string}
 */
export default function lowerCaseFirstLetter(str:string|string[],sep:string=''):string{
	if(!str){return '';}
	if(Array.isArray(str)){
		return str.map(s=>lowerCaseFirstLetter(s,sep)).filter(Boolean).join(sep);
	}
	else{
		return str.charAt(0).toLowerCase() + str.slice(1);
	}
}