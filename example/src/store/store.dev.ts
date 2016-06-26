import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import {reducer,state} from '../apps/data'
import { enhance } from '../apps/Root/DevTools';
import {persistState} from 'redux-devtools';  

const enhancer = compose
	( applyMiddleware
		( thunkMiddleware
		//, createLogger()
		)
	, enhance()
	, persistState(getDebugSessionKey())
	);

export default function configureStore(initialState=state){
	const store = createStore
		( reducer
		, state
		, enhancer
		);

	if (module.hot) {
		module.hot.accept('../apps/data', () => store.replaceReducer
			( require('../apps/data').reducer
			)
		);
	}

	return store;
}

function getDebugSessionKey() {

	const matches = (typeof window !== 'undefined') && window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
	return (matches && matches.length > 0)? matches[1] : null;
}