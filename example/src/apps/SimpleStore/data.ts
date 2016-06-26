import {simpleStore,assign} from '../../../../src';

export enum VISIBILITY
	{ ALL
	, COMPLETED
	, UNCOMPLETED
	}


export default simpleStore
	( (id,text)=>(
		{ id
		, text
		, completed:false
		, order:id
		, view_mode:true
		, nesting:0
		})	
	, ({state,add,addMany,remove,update,toggle,get},edit)=>(
		{ state:assign
			( addMany
				( state
				,	[ 'Add todo'
					, 'Add another todo'
					, '...?'
					, 'Profit!'
					]
				)
			, {visibility:VISIBILITY.ALL}
			)
		, actions:
			{ add
			, remove
			, complete:(state,id)=>toggle(state,{id,prop:'completed'})
			, filter:(state,visibility)=>assign(state,{visibility})
			, mode:(state,id)=>toggle(state,{id,prop:'view_mode'})
			, change:(state,{id,text})=>edit(state,id,(el)=>assign(el,{text}))
			, order:(state,{id1,id2})=>
				{ 
					const order2 = get(state,id1).order
					const order1 = get(state,id2).order
					state = edit(state,id1,(el)=>assign(el,{order:order1}));
					state = edit(state,id2,(el)=>assign(el,{order:order2}));
					return state;
				}
			,	nest:(state,{id1,id2})=>
					{
						const maxNesting = Math.min(get(state,id2).nesting+1,10)
						const nesting = get(state,id1).nesting+1;
						return ((nesting <= maxNesting) && edit(state,id1,el=>assign(el,{nesting})));
					}
			}
		})
	);