/**
 * 
 * ```
 * ({a:b},(b,a))=>void
 * ```
 * 
 * Processes an object; equivalent of an array's `forEach`
 * 
 * @param {Object<T>} obj
 * @param {(val:T,name:string)=>void} callback
 */
export default function loop<T>(obj:AR_Utils.Obj<T>,callback:(val:T,name:string)=>void):void{
	obj && (typeof obj == 'object') && Object.keys(obj).forEach(function(name:string){
		const curr = obj[name];
		callback(curr,name);
	});
}