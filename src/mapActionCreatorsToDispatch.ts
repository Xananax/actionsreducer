import assign from './utils/assign';
import SKIP from './SKIP';
import defaultAsyncActions from './defaultAsyncActions';

/**
 * 
 * ```
 * ((action:Action|AsyncAction):any,Array<(payload:any,meta:any,err?:boolean):Action>)=>{'':(payload?:any,meta?:any,err?:boolean):any}
 * ```
 * @export
 * @param {(action:Action|AsyncAction):any} dispatch
 * @param {Array<(payload:any,meta:any,err?:boolean):Action>} creators
 * @returns {Object<(payload?:any,meta?:any,err?:boolean):any>}
 */
export default function mapActionCreatorsToDispatch
	( dispatch:AR_Redux.Dispatch
	, creators:AR_Redux.ActionCreator[]
	):AR_Conf.ActionDispatchers
	{
		const actions = {
			
		} as AR_Conf.ActionDispatchers;
		defaultAsyncActions.forEach(function(name,index){
			const creator = creators[index];
			const isErrorHandler = (name == 'error');

			actions[name] = isErrorHandler ?	
				(reason,meta)=>{
					const err:Error = (!(reason instanceof Error)) ? new Error(reason) : reason;
					const message = err.message;
					meta = meta ? assign(meta,{message}) : {message};
					dispatch(creator(err,meta))
					return Promise.reject(SKIP);
				} :
			 	(payload,meta)=> dispatch(creator(payload,meta))
			; 
		})
		
		return actions;
	} 