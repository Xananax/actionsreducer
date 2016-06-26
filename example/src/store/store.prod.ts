import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import {reducer,state} from '../apps/data'

const enhancer = applyMiddleware
	( thunkMiddleware
	);

export default function configureStore(initialState=state){
	return createStore
		( reducer
		, state
		, enhancer
		);
}