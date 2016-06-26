import assign from './utils/assign';
import loop from './utils/loop';
import processRootLevelChunk from './processRootLevelChunk';

export default function processSubStateChunk<T>
	( stateChunk:AR_Conf.StateChunk
	, parentState:T
	, parentProcessors:AR_Build.ActionProcessors
	, parentActions:AR_Build.Actions
	, parentIdentifier:AR_Conf.CapitalizedString
	, parentType:AR_Conf.SnakeCasedString
	, path:string[]
	)
	{

		const processors:AR_Build.ActionProcessors = {};
		const actions:AR_Build.Actions = {};

		processRootLevelChunk(stateChunk,parentState,processors,actions,parentIdentifier,parentType,path);

		const combinedProcessor = function combinedProcessor
			( state:T
			, payload:any
			, meta:any
			, type:AR_Conf.SnakeCasedString
			)
			{
				const processor = processors[type];
				if(!processor){return state;}
				const {identifier} = processor;
				const subState = state[identifier];
				const ret = processor(subState,payload,meta,type);
				if(ret==null || ret===false){return state;}
				return assign(state,{[identifier]:ret});
			} as AR_Conf.ActionProcessor;

		combinedProcessor.identifier = parentIdentifier;

		loop(actions,function(action){
			const {identifier,type} = action;
			parentActions[identifier] = action;
			parentProcessors[type] = combinedProcessor;
		});

	}