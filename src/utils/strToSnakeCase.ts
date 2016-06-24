/**
 * 
 * ```
 * (''|''[],''?)=>''
 * ```
 * 
 * Turns a string or an array of string into a Snake_Cased string.
 * "_"" are created for every capital letter encountered.
 * If there's a leading "_", it will be removed.
 * 
 * If passed an array, it will be joined with the `sep` argument.
 * 
 * @param {(string|string[])} str
 * @param {string} [sep='_']
 * @returns {string}
 */
export default function strToSnakeCase(str:string|string[],sep:string='_'):AR_Conf.SnakeCasedString{
	if(Array.isArray(str)){
		return str.map(s=>strToSnakeCase(s,sep)).filter(Boolean).join(sep);
	}else{
		return str.replace
			( /\.?([A-Z]+)/g
			, (x,y)=>"_" + y.toLowerCase()
			)
			.replace(/^_/, "")
			.toUpperCase();
	}
}
