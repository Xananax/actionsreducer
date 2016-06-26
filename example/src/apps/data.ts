import actionsReducer from '../../../src';
import todos from './Todos/data';
import reddit from './Reddit/data';
import store from './SimpleStore/data';
import git from './Github/data';
import {VISIBILITY_FILTERS} from './consts';

const [reducer,state,actions] = actionsReducer(
	{ todos
	, reddit
	, git
	, store
	});

export 
	{ reducer
	, state
	, VISIBILITY_FILTERS
	, actions
	}
