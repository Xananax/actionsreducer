import Reddit from './Reddit';
import Todos from './Todos';
import SimpleStore from './SimpleStore';
import Github from './Github';

const pages = [
		{ name:'Super Simple Todos'
		, to:'store'
		, app:SimpleStore
		}
	,	{ name: 'Github Gists'
		, to:'github'
		, app:Github
		}
	,	{ name:'Redux Todos'
		, to:'todos'
		, app:Todos
		}
	,	{ name:'Redux Reddit'
		, to:'reddit'
		, app:Reddit
		}
	];

export default pages;