export default function store(state,reducer:AR_Redux.Reducer<any>):AR_Redux.Dispatch{

	let currentState = state;

	const getState = function getState(){
		return currentState;
	}

	const dispatch = function dispatch(action){
		const ret = reducer(currentState,action);
		if(typeof ret == 'function'){
			return ret(dispatch,getState).then(function(stuff){
				console.log(stuff);
				return stuff;
			})
		}else{
			currentState = ret;
		}
		return currentState;
	}

	return dispatch;

}