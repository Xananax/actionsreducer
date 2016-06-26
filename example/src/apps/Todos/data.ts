import 
	{ simpleStore
	, assign
	} from '../../../../src';
import {VISIBILITY_FILTERS} from '../consts';

const todos = simpleStore(
	(id,payload)=>(
		{ id
		, text:payload['text']
		, starred:false
		, completed:false
		}
	)
,	({state,add,addMany,remove,update,toggle,get},edit)=>(
		{ state:assign(
			addMany(
				state
				,	[ { text: '2Pac' }
					, { text: 'Dr.Dre' }
					, { text: 'Big Pun' }
					]
			),{
				visibilityFilter:VISIBILITY_FILTERS.SHOW_ALL	
			})
		, actions:
			{ add:(state,text)=>add(state,{text})
			, remove
			, star:(state,id)=>edit(state,id,(el)=>assign(el,{starred: !el.starred}))
			, complete:(state,id)=>toggle(state,{id,prop:'completed'})
			, filter:(state,visibilityFilter)=>assign(state,{visibilityFilter})
			}
		}
	)
);

export default todos;