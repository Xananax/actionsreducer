import processActionProcessors from './processActionProcessors';
import combineProcessors from './combineProcessors';

export default function processStateChunk<T>
	( stateChunk:AR_Conf.StateChunk
	, parentIdentifier:AR_Conf.CapitalizedString
	, parentType:AR_Conf.SnakeCasedString
	, path:string[]
	):AR_Build.ActionProcessorTuple<T>
	{
		const
			{ state
			, actions:actionsConf
			} = stateChunk;

		const processors:AR_Build.ActionProcessors = {}
		const actions:AR_Build.Actions = {};

		processActionProcessors(actionsConf,state,processors,actions,parentIdentifier,parentType,path);
		
		const processor = combineProcessors(processors,parentIdentifier);

		return [processor,state,actions];

	}