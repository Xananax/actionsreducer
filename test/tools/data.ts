import assign from '../../src/utils/assign';
import contains from '../../src/utils/contains';
import fetch from './fakeFetch';

function sendErr(errorActionCreator,field){
	return errorActionCreator(
		`${field} is required`
	,	{ type:'field_required'
		, field:field
		}
	);
}

export default 
	{ api:
		{ state:
			{ answer: false
			, app_id:false
			, app_secret:false
			, page_name:''
			}
		,	actions:
				{ set: (state,{id,secret})=>({app_id:id,app_secret:secret})
				, call:
					{ _:({app_id,app_secret},{name},meta,actions,dispatch)=>
						{
							if(!app_id){return sendErr(actions.error,'app_id');}
							if(!app_secret){return sendErr(actions.error,'app_secret');}
							if(!name){return sendErr(actions.error,'page_name');}
							const url = name;
							return fetch(url).then(res=>res.json());
						}
					, started:(state,{name})=>(
						{ page_name:name
						})
					, success:(state,payload)=>(
						{ answer:payload
						, page_name:true
						})
					, error:(state,payload,meta)=>(
						(meta && meta.type == 'field_required') ?
							(
								{ [meta.field]:false
								, page_name:''
								}
							) : (
								{ page_name:''
								}
							)
						)
					}
				}		
		}
	, notes:
		{ state:
			{ notes:
				[0, 1, 2]
			, starred:
				[]
			, notesById:
				[
					{ id: 0
					, text: 'ddddddddddd'
					}
				,	{ id: 1
					, text: 'Dr.Dre'
					}
				,	{ id: 2
					, text: 'Big Pun'
					}
				]
			}
		, actions:
			{ completed:
				{ state: []
				, actions:
					{ complete:(completed,{id})=>
						!contains(completed,id) ? completed.concat([id]) : null
					, uncomplete:(completed,{id})=> 
						contains(completed,id) ? completed.filter(_id=>_id==id) : null
					}
				}
			, add({notes,notesById},{text})
				{
					const len = notes.length ? notes.length : 1;
					const id = (notes[len - 1] + 1) || 0;
					return (
						{ notes: notes.concat(id)
						, notesById: 
							[ ...notesById
							,	{ id
								, text
								, starred:false
								}
							]
						}
					);
				}
			, remove:({notes,notesById},{id})=>(
				{ notes: notes.filter(_id => _id !== id)
				, notesById: notesById.filter((note) => note.id !== id)
				})
			, star:({notesById,starred},{id})=>(
				{ notesById:
					notesById.map
						( note => 
							( note.id === id ) ? 
								assign(note,{starred: !note.starred}) : 
								note 
						)
				, starred: contains(starred,id) ? 
					starred.filter(_id=>_id==id) : starred.concat([id]) 
				})
			}
		}
	};