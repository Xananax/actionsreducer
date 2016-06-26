import loop from './utils/loop';
import strToSnakeCase from './utils/strToSnakeCase';
import processRootLevelChunk from './processRootLevelChunk';
import combineProcessorsToReducer from './combineProcessorsToReducer';

export default function actionsReducer
	( conf:AR_Conf.Config | any //until TS can automatically infer types from object litterals
	):AR_Build.ActionReducersTuple
	{
		const state = {};
		const processors:AR_Build.ActionProcessors = {};
		const actions:AR_Build.Actions = {};

		loop(conf,function(chunk:AR_Conf.StateChunk,identifier){
			const type = strToSnakeCase(identifier);
			processRootLevelChunk(chunk,state,processors,actions,identifier,type,[]);
		});

		const reducer = combineProcessorsToReducer(state,processors);

		return [reducer,state,actions];

	}