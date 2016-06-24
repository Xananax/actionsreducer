/**
 * 
 * ```
 * (a*,Error|boolean)=>a|Error
 * ```
 * 
 * If `err` is true, returns an Error.
 * 
 * @param  {any} payload
 * @param  {Error|boolean} err
 * @returns any an Error is `err` is an error or is true, the original payload otherwise
 */
export default function errToPayload(payload:any,err:Error|boolean):any{
	if(err){
		if(err instanceof Error){
			return err;
		}else if(typeof payload == 'string'){
			return new Error(payload);
		}else{
			return new Error(`Error: ${err}`);
		}
	}
	return payload;
}