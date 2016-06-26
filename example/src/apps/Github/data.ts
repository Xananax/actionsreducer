import * as fetch from 'isomorphic-fetch'

export enum MODE
	{ LOADING
	, DONE
	, ERROR
	, NOTHING
	}

export default
	{ state:
		{ name: 'xananax'
		, mode:MODE.NOTHING
		, error:null
		, gists:[]
		}
	,	actions:
			{ set: (state,name)=>({name})
			, call:
				{ _:({name},payload,meta,actions,dispatch)=>
					{
						if(!name){return actions.error('no name specified');}
						const url = name;
						return fetch
							( `https://api.github.com/users/${name}/gists`
							,	{ headers:{ Accept:'application/vnd.github.v3+json' }
								}
							)
							.then(res=>res.json())
							.then(gists=>gists.map(({html_url,files})=>(
								{ url:html_url
								, title:Object.keys(files)[0]
								}
							)))

					}
				, started:()=>({ mode:MODE.LOADING })
				, success:(state,gists)=>({ mode:MODE.LOADING, gists})
				, error:(state,error)=>({mode:MODE.ERROR,error})
				}
			}
	};