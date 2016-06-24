import assign from './utils/assign';

export default function combineProcessors<T>
	( processors:AR_Build.ActionProcessors
	, identifier:AR_Conf.CapitalizedString
	):AR_Conf.ActionProcessor
	{
		 const combinedProcessor = function combinedProcessor
		 	( state:T
			, payload:AR_Redux.Payload<T>
			, meta:AR_Redux.Meta
			, type:AR_Conf.SnakeCasedString
			):T
			{
				const processor = processors[type];
				if(!processor){return state;}
				const ret = processor(state,payload,meta,type);
				if(ret==null || ret===false){return state;}
				return assign(state,ret);
			} as AR_Conf.ActionProcessor;

		combinedProcessor.identifier = identifier;

		return combinedProcessor;
	}