import Reddit from './Reddit';
import Todos from './Todos';

const pages = [
		{ name:'Todos Example'
		, to:'todos'
		, app:Todos
		}
	,	{ name:'Reddit Example'
		, to:'reddit'
		, app:Reddit
		}
	];

export default pages;