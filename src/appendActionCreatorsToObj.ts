/**
 * ```
 * (Array<(payload:any,meta:any,err?:boolean):Action>,{}?)=>{'':(payload:any,meta:any,err?:boolean):Action}
 * ```
 * Appends an array of Action Creators to an object.
 * Each object's key will be the Action Creator's identifier.
 * If no object is passed, a new one is created.
 * 
 * @export
 * @param {Array<(payload:any,meta:any,err?:boolean):Action>} creators
 * @param {*} [obj={}]
 * @returns {Object<(payload:any,meta:any,err?:boolean):Action>}
 */
export default function appendActionCreatorsToObj(creators:AR_Redux.ActionCreator[]):AR_Utils.Obj<AR_Redux.ActionCreator>;
export default function appendActionCreatorsToObj<T>(creators:AR_Redux.ActionCreator[],obj:T):T;
export default function appendActionCreatorsToObj
	( creators:AR_Redux.ActionCreator[]
	, obj:any = {}
	):AR_Utils.Obj<AR_Redux.ActionCreator>
	{
		creators.forEach(function(creator){
			const {identifier} = creator;
			obj[identifier] = creator;
		});
		return obj;
	}