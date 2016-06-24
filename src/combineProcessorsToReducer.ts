import assign from './utils/assign';

export default function combineProcessorsToReducer<T>
	( initialState:T
	, processors:AR_Build.ActionProcessors
	):AR_Redux.Reducer<T>
	{
		const reducer = function combinedReducer(state:T=initialState,action:AR_Redux.Action){
			if(!action){return state;}
			const processor = processors[action.type];
			if(!processor){return state;}
			const {payload,meta,type} = action;
			const {identifier} = processor;
			const subState = state[identifier];
			const ret = processor(subState,payload,meta,type);
			if(ret==null || ret===false){return state;}
			return assign(state,{[identifier]:ret});
		}

		return reducer;
	}