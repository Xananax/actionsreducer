import loop from './utils/loop';
import processStateChunk from './processStateChunk';

export default function processRootLevelChunk<T>
	( stateChunk:AR_Conf.StateChunk
	, parentState:T
	, parentProcessors:AR_Build.ActionProcessors
	, parentActions:AR_Build.Actions
	, parentIdentifier:AR_Conf.CapitalizedString
	, parentType:AR_Conf.SnakeCasedString
	, path:string[]
	)
	{

		const [processor,state,actions] = processStateChunk(stateChunk,parentIdentifier,parentType,path);
		
		loop(actions,function(action){
			const {identifier,type} = action;
			parentActions[identifier] = action;
			parentProcessors[type] = processor;
		});

		parentState[parentIdentifier] = state;

	}