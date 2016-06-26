import assign from './utils/assign';

function defaultCreate(newId,payload){
	return assign({id:newId},payload);
}

function defaultProcess(store,edit){
	const {state,add,addMany,remove,update,toggle} = store;
	return {
		state
	,	actions:
		{ add, addMany, remove, update, toggle }	
	}
}

export default function simpleStore<T>(create?:AR_Store.StoreCreator<T>,process?:AR_Store.PostProcessor<T>){

	if(!process){process = defaultProcess;}

	if(!create){create = defaultCreate;}

	const state:AR_Store.State<T> = 
		{
			ids:[]
		,	byId:[]
		}

	function add(state:AR_Store.State<T>,payload:any,meta?)
		{
			const len = state.ids.length || 1;
			const newId = (state.ids[len - 1] + 1) || 0;
			return (
				{ ids: state.ids.concat(newId)
				, byId: 
					[ ...state.byId
					,	create(newId,payload,state.byId)
					]
				}
			);
		}

	function addMany(state:AR_Store.State<T>,list,meta)
		{
			list.forEach(function(el){
				state = add(state,el,meta);
			})
			return state;
		}

	function remove(state:AR_Store.State<T>,id:number)
		{
			return (
				{ ids: state.ids.filter((_id) => _id !== id)
				, byId: state.byId.filter(el => el.id !== id)
				}
			);
		}

	function edit(state:AR_Store.State<T>,id:number,fn:(T)=>T)
		{
			return (
				{ byId:
					state.byId.map
						( el => 
							( el.id === id ) ? fn(el) : el
						)
				}
			)
		}

	function update(state:AR_Store.State<T>,payload)
		{
			return edit(state,payload.id,(el)=>assign(el,payload)); 
		}

	function toggle(state:AR_Store.State<T>,{id,prop})
		{
			return edit(state,id,(el)=>assign(el,{[prop]: !el[prop]}));
		}

	function get(state:AR_Store.State<T>,id:number){
		const index = state.ids.indexOf(id);
		return state.byId[index];
	}

	const props:AR_Store.StoreGenerated<T> = 
		{ state
		, add
		, addMany
		, remove
		, update
		, toggle
		, get
		};

	return process(props,edit);
}