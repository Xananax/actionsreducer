import makeCombinedReducer from '../../src';
import store from './store';

export default function makeDispatch(data){

	const [reducer,actions,state] = makeCombinedReducer(data)
	const dispatch = store(state,reducer);

	return [dispatch,actions];

}