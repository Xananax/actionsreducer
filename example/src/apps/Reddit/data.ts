import assign from '../../../../src/utils/assign';
import contains from '../../../../src/utils/contains';
import * as fetch from 'isomorphic-fetch'

function createSubreddit(name){
	return (
		{ name
		, isFetching:false
		, didInvalidate:false
		, lastUpdated:new Date()
		, items:[]
		}
	);
}

function update(postsBySubreddit,selectedSubreddit:string,additional){
	const sub = postsBySubreddit[selectedSubreddit];
	const exists = !!sub;
	if(exists && !additional){return null;}

	const updatedSub = assign
		( exists ? sub : createSubreddit(selectedSubreddit) 
		, additional
		)
	const updatedPostsBySubReddit = assign
		( postsBySubreddit
		, { [selectedSubreddit]:updatedSub }
		)
	return { postsBySubreddit:updatedPostsBySubReddit };
}

function shouldFetchPosts(postsBySubreddit, subreddit) {
	const posts = postsBySubreddit[subreddit];
	if(!posts){return true;}
	return (posts.isFetching ? 
		true :
		(posts.didInvalidate ? 
			true :
			false
		)
	); 
}

export default
	{ state:
		{ selectedSubreddit: 'reactjs'
		, lastError:null
		, postsBySubreddit:
			{ reactjs:
				{ name:'reactjs'
				, isFetching:false
				, didInvalidate:false
				, lastUpdated:new Date()
				, items:
					[
						{ id: 42
						, title: 'Confusion about Flux and Relay'
						}
					,	{ id: 500
						, title: 'Creating a Simple Application Using React JS and Flux Architecture'
						}
					]
				}

			}
		}
	,	actions:
			{ select: (state,selectedSubreddit)=>({selectedSubreddit})
			, invalidate: ({postsBySubreddit},subreddit)=>
				{
					if(postsBySubreddit[subreddit]){
						return {
							postsBySubreddit:{
								[subreddit]:assign(postsBySubreddit[subreddit],{didInvalidate:true})
							}
						}
					}
				}
			, fetch:
				{ _:({postsBySubreddit,selectedSubreddit},payload,meta,actions,dispatch)=>
					shouldFetchPosts(postsBySubreddit,selectedSubreddit) ?
						fetch(`https://www.reddit.com/r/${selectedSubreddit}.json`)
							.then(response => response.json()) 
							.then(json=>json.data.children.map(child=>child.data))
							.catch(err=>console.log(err)):
						null
				, started:({selectedSubreddit,postsBySubreddit})=> update
					( postsBySubreddit
					, selectedSubreddit
					, 	{ isFetching:true
						, didInvalidate:false
						}
					)

				, success:({selectedSubreddit,postsBySubreddit},items)=>update
					( postsBySubreddit
					, selectedSubreddit
					, 	{ isFetching:false
						, didInvalidate:false
						, lastUpdated:new Date()
						, items
						}
					)
				, error:({selectedSubreddit},error,meta)=>(
					{ lastError:
						{ error
						, selectedSubreddit
						}
					})
				}
			}		
	};