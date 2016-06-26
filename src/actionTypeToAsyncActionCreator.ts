import strToSnakeCase from './utils/strToSnakeCase';
import getByPath from './utils/getByPath';
import createCamelCaseIdentifier from './utils/createCamelCaseIdentifier';
import isError from './utils/isError';
import errToPayload from './utils/errToPayload';
import isPromise from './utils/isPromise';
import defaultAsyncActions from './defaultAsyncActions';
import actionTypeToSyncActionCreator from './actionTypeToSyncActionCreator';
import mapActionCreatorsToDispatch from './mapActionCreatorsToDispatch';
import SKIP from './SKIP';
import CANCEL from './CANCEL';
import appendActionCreatorsToObj from './appendActionCreatorsToObj';


export default function actionTypeToAsyncActionCreator<T>
	( identifier:AR_Conf.CapitalizedString
	, type:AR_Conf.SnakeCasedString
	, asyncFn:AR_Conf.AsyncActionProcessorMain
	, path:string[]
	):AR_Redux.AsyncActionCreator
	{
		
		const actionsArray = defaultAsyncActions.map(id=>
			actionTypeToSyncActionCreator
				( createCamelCaseIdentifier(identifier,id)
				, strToSnakeCase([identifier,id])
				) 
		);
		
		const statePath = path.slice(0,path.length-1);
		//console.log(actionsArray.map(a=>a.type))
		const actionCreator = function asyncActionCreator
			( payload:any
			, meta:any
			, err?:boolean
			)
			{
				let error = false;
				payload = errToPayload(payload,err);
				if(isError(payload)){error = true;}
				const asyncAction:AR_Redux.AsyncAction<T> = function asyncAction
					( dispatch:AR_Redux.Dispatch
					, getState:AR_Redux.GetState<T>
					):Promise<any>
					{
						if(error){
							dispatch(actionCreator.error(payload,meta,err));
							return Promise.reject(error);
						}
						const actionDispatchers = mapActionCreatorsToDispatch(dispatch,actionsArray);
						
						actionDispatchers.started(payload,meta);

						const state = getByPath(statePath,getState());

						const ret = asyncFn(state,payload,meta,actionDispatchers,dispatch,type);

						const promise:Promise<any> = isPromise(ret) ? 
							ret : 
							isError(ret) ?
								Promise.reject(ret) :
								Promise.resolve(ret)
						; 
						function onSuccess(result){
							if(result == null || result === false || result === CANCEL){
								actionDispatchers.cancelled(result);
								return result;
							}
							actionDispatchers.success(result,meta);
							return result;
						}
						function onError(err){
							if(err == SKIP){return err;}
							actionDispatchers.error(err,meta);
							return err;
						}
						return promise.then(onSuccess).catch(onError);
					}
				return asyncAction;
			} as AR_Redux.AsyncActionCreator;
		actionCreator.type = type;
		actionCreator.identifier = identifier;
		actionCreator.start = actionCreator;
		defaultAsyncActions.forEach(function(name,index){
			const ac = actionsArray[index];
			actionCreator[name] = ac;
		})
		return actionCreator;
	}