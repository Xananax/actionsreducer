import loop from './utils/loop';
import strCapitalizeFirst from './utils/strCapitalizeFirst';
import strToSnakeCase from './utils/strToSnakeCase';
import processRootLevelChunk from './processRootLevelChunk';
import combineProcessorsToReducer from './combineProcessorsToReducer';

export default function actionsReducer
	( conf:AR_Conf.Config
	):AR_Build.ActionReducersTuple
	{
		const state = {};
		const processors:AR_Build.ActionProcessors = {};
		const actions:AR_Build.Actions = {};

		loop(conf,function(chunk,id){
			const identifier = strCapitalizeFirst(id);
			const type = strToSnakeCase(id);
			processRootLevelChunk(chunk,state,processors,actions,identifier,type);
		});

		const reducer = combineProcessorsToReducer(state,processors);

		return [reducer,state,actions];

	}