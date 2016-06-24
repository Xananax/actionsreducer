import strCapitalizeFirst from './utils/strCapitalizeFirst';
import strToSnakeCase from './utils/strToSnakeCase';
import isStateChunk from './identity/isStateChunk';
import isAsyncActionProcessor from './identity/isAsyncActionProcessor';
import isActionProcessor from './identity/isActionProcessor';
import processSubStateChunk from './processSubStateChunk';
import actionTypeToAsyncActionCreator from './actionTypeToAsyncActionCreator';
import actionTypeToSyncActionCreator from './actionTypeToSyncActionCreator';

export default function processActionProcessor<T>
	( state:T
	, processors:AR_Build.ActionProcessors
	, actions:AR_Build.Actions
	, parentIdentifier:AR_Conf.CapitalizedString
	, parentType:AR_Conf.SnakeCasedString
	, conf:AR_Conf.Action
	, id:AR_Conf.CapitalizedString
	)
	{
		
		const identifier = strCapitalizeFirst([parentIdentifier,id])
		const type = strToSnakeCase([parentType,identifier]);

		if(isStateChunk(conf)){
			processSubStateChunk(conf,state,processors,actions,parentIdentifier,parentType);	
		}
		if(isAsyncActionProcessor(conf)){
			const asyncFn = conf._;
			const actionCreator = actionTypeToAsyncActionCreator(identifier,type,asyncFn);
			if(!(conf.success)){
				throw new Error(`async action \`${identifier}\` should have at least a \`success\` handler`);
			}
			const success = conf.success;
			actions[identifier] = actionCreator;
			success.identifier = identifier;
			processors[actionCreator.success.type] = success;
			if(conf.error){
				const error = conf.error;
				error.identifier = actionCreator.error.identifier;
				processors[actionCreator.error.type] = error;
			} 
			if(conf.started){
				const started = conf.started;
				started.identifier = actionCreator.started.identifier;
				processors[actionCreator.started.type] = started;
			}
		}
		if(isActionProcessor(conf)){
			const actionCreator = actionTypeToSyncActionCreator(identifier,type)
			actions[identifier] = actionCreator;
			conf.identifier = identifier;
			processors[actionCreator.type] = conf;
		}

	}