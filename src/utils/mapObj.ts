import loop from './loop';


/**
 * 
 * ```
 * ({a:b},(b,a):c)=>{a:c}
 * ```
 * 
 * Maps an object's properties to another object's properties.
 * Equivalent to an array's `map` method.
 * `null` and `undefined` values will be skipped
 * (so this can be used as a `filter` of sorts).
 * This behavior can be cancelled by setting the `doNotSkip`
 * flag to `true`.
 * 
 * If no values at all have been assigned, that is, the callback
 * returned `null` or `undefined` values for every member, then
 * `false` is returned, unless the `alwaysReturn` flag is set to
 * `true`. 
 * 
 * @param {Object<T>} obj the initial object.
 * @param {(val:T,name:string)=>R} callback a function to call on each member.
 * @param {boolean} [alwaysReturn=false] if true, an object will always be returned,
 *                                       even if it has no values.
 * @param {boolean} [doNotSkip=false]    if true, `undefined` and `null` will be 
 *                                       assigned to the returned object
 * @returns {Object<R> | False }         A new constructed object, or false if 
 *                                       `null` or `undefined` was returned for
 *                                       every member and `alwaysReturn` and 
 *                                       `doNotSkip` were false.
 */
export default function mapObj<T,R>(obj:AR_Utils.Obj<T>,callback:(val:T,name:string)=>R,alwaysReturn:boolean=false,doNotSkip:boolean=false):AR_Utils.Obj<R>{
	const ret = {} as AR_Utils.Obj<R>;
	let hasValue = false; 
	loop(obj,function(val,name){
		const r = callback(val,name);
		if(r==null){return;}
		hasValue = true;
		ret[name] = r;
	});
	
	return (
		(alwaysReturn && ret) ||
		(hasValue && ret)
	);
}