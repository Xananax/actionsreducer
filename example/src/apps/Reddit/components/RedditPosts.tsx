import * as React from 'react'
import {PropTypes} from 'react';

export interface PostsPropTypes{
	posts:any[]
}

const Posts:React.StatelessComponent<PostsPropTypes> = ({posts}) => (
	<ul>
			{posts.map((post, i) =>
				<li key={i}><a href={`//reddit.com${post.permalink}`}>{post.title}</a></li>
			)}
	</ul>);


Posts.propTypes = 
	{ posts: PropTypes.array.isRequired
	}

export default Posts;