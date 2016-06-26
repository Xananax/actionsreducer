import actionsReducer from '../../../src';
import todos from './Todos/data';
import reddit from './Reddit/data';
import {VISIBILITY_FILTERS} from './consts';

const [reducer,state,actions] = actionsReducer(
	{ todos
	, reddit
	});

export 
	{ reducer
	, state
	, VISIBILITY_FILTERS
	, actions
	}
