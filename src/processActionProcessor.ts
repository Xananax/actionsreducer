import createCamelCaseIdentifier from './utils/createCamelCaseIdentifier';
import strToSnakeCase from './utils/strToSnakeCase';
import isStateChunk from './identity/isStateChunk';
import isAsyncActionProcessor from './identity/isAsyncActionProcessor';
import isActionProcessor from './identity/isActionProcessor';
import processSubStateChunk from './processSubStateChunk';
import actionTypeToAsyncActionCreator from './actionTypeToAsyncActionCreator';
import actionTypeToSyncActionCreator from './actionTypeToSyncActionCreator';
import appendActionCreatorsToObj from './appendActionCreatorsToObj';
import defaultAsyncActions from './defaultAsyncActions';

export default function processActionProcessor<T>
	( state:T
	, processors:AR_Build.ActionProcessors
	, actions:AR_Build.Actions
	, parentIdentifier:AR_Conf.CapitalizedString
	, parentType:AR_Conf.SnakeCasedString
	, conf:AR_Conf.Action
	, id:AR_Conf.CapitalizedString
	, path:string[]
	)
	{
		
		const identifier = createCamelCaseIdentifier(parentIdentifier,id)
		const type = strToSnakeCase([parentType,id]);
		path = path.concat([parentIdentifier,id]);
		
		if(isStateChunk(conf)){
			processSubStateChunk(conf,state,processors,actions,parentIdentifier,parentType,path);	
		}
		if(isAsyncActionProcessor(conf)){
			const asyncFn = conf._;
			
			const actionCreator = actionTypeToAsyncActionCreator(identifier,type,asyncFn,path);
			
			actions[identifier] = actionCreator;
			
			
			if(!(conf.success)){
				throw new Error(`async action \`${identifier}\` should have at least a \`success\` handler`);
			}
			
			defaultAsyncActions.map(name=>appendAsyncAction(processors,actions,conf,actionCreator,name));

		}
		if(isActionProcessor(conf)){
			const actionCreator = actionTypeToSyncActionCreator(identifier,type)
			actions[identifier] = actionCreator;
			conf.identifier = identifier;
			processors[actionCreator.type] = conf;
		}

	}

function appendAsyncAction
	( processors:AR_Build.ActionProcessors
	, actions:AR_Build.Actions
	, conf:AR_Conf.AsyncActionProcessor
	, actionCreator:AR_Redux.AsyncActionCreator
	, processorName:string
	):boolean
	{
		if(!conf[processorName]){return false;}

		const processor = conf[processorName];
		const action = actionCreator[processorName];
		const identifier = action.identifier;
		processor.identifier = identifier;
		processors[action.type] = processor;
		actions[identifier] = action;
		return true;
	}