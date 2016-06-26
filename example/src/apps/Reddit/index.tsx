import {actions} from '../data';
import { connect } from 'react-redux'
import Reddit,{RedditPropTypes} from './components/Reddit';
const 
	{ redditSelect
	, redditFetch
	, redditInvalidate
	} = actions;

function mapStateToProps({reddit:{selectedSubreddit,postsBySubreddit}}):RedditPropTypes { 
		
	const sub = postsBySubreddit[selectedSubreddit];
	const isFetching = sub ? sub.isFetching : false;
	const lastUpdated = sub ? sub.lastUpdated : null;
	const items = sub ? sub.items :[];

	return (
		{ selectedSubreddit
		, items
		, isFetching
		, lastUpdated
		}
	);
}

const mapDispatchToProps = (dispatch, ownProps):RedditPropTypes => (
	{ fetchSubreddit: (selectedSubreddit:string) => dispatch(redditFetch(selectedSubreddit))
	, invalidateSubreddit:(selectedSubreddit:string) => dispatch(redditInvalidate(selectedSubreddit))
	, selectSubreddit:(selectedSubreddit:string) => dispatch(redditSelect(selectedSubreddit))
	});


export default connect
	( mapStateToProps
	, mapDispatchToProps
	)(Reddit);