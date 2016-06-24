
/**
 * 
 * ```
 * ([a],*)=>boolean
 * ```
 * 
 * Verifies that an array contains an element
 * @param {any[]} arr
 * @param {*} el
 * @returns {boolean}
 */
export default function contains(arr:any[],el?:any):boolean{
	if(!arr || !arr.length){return false;}
	return (arr.indexOf(el) >= 0);
}