import assign from './utils/assign';
import CANCEL from './CANCEL';

export default function combineProcessors<T>
	( processors:AR_Build.ActionProcessors
	, identifier:AR_Conf.CapitalizedString
	):AR_Conf.ActionProcessor
	{

		 const combinedProcessor = function combinedProcessor
		 	( state:T
			, payload:any
			, meta:any
			, type:AR_Conf.SnakeCasedString
			):T
			{
				const processor = processors[type];
				if(!processor){return state;}
				const ret = processor(state,payload,meta,type);
				if( 
					ret==null || 
					ret===false || 
					ret === CANCEL ||
					ret === state
				){
					return state;
				}
				return assign(state,ret);
			} as AR_Conf.ActionProcessor;

		combinedProcessor.identifier = identifier;

		return combinedProcessor;
	}