import loop from './utils/loop';
import processActionProcessor from './processActionProcessor';

export default function processActionProcessors<T>
	( actionsConf:AR_Conf.Actions
	, state:T
	, processors:AR_Build.ActionProcessors
	, actions:AR_Build.Actions
	, parentIdentifier:AR_Conf.CapitalizedString
	, parentType:AR_Conf.SnakeCasedString
	)
	{
		loop(actionsConf,(conf,id)=>
			processActionProcessor(state,processors,actions,parentIdentifier,parentType,conf,id)
		)
		
	}