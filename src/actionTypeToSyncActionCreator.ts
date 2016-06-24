import errToPayload from './utils/errToPayload';
import isError from './utils/isError';

export default function actionTypeToSyncActionCreator<T>
	( identifier:AR_Conf.CapitalizedString
	, type:AR_Conf.SnakeCasedString
	):AR_Redux.ActionCreator
	{
		const actionCreator = function actionCreator
			( payload:AR_Redux.Payload<T>
			, meta:AR_Redux.Meta
			, err?:boolean
			):AR_Redux.Action
			{
				let error = false;
				payload = errToPayload(payload,err); 
				if(isError(payload)){error = true;}
				return { type, payload, meta, error }
			} as AR_Redux.ActionCreator;
		actionCreator.type = type;
		actionCreator.identifier = identifier;
		actionCreator.start = actionCreator;
		return actionCreator
	}