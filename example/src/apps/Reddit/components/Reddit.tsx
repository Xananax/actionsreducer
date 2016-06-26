import * as React from 'react';
import { Component, PropTypes } from 'react';
import Picker from './Picker';
import RedditPosts from './RedditPosts';
import Source from '../../Source';

export interface RedditPropTypes{
	selectedSubreddit?:string;
	items?:any[]
	isFetching?:boolean;
	lastUpdated?:Date;
	fetchSubreddit?:(selectedSubreddit:string)=>any;
	selectSubreddit?:(selectedSubreddit:string)=>any;
	invalidateSubreddit?:(selectedSubreddit:string)=>any;
}

export default class Reddit extends Component<RedditPropTypes,void> {

	static propTypes:React.ValidationMap<RedditPropTypes> = 
		{ selectedSubreddit: PropTypes.string.isRequired
		, items: PropTypes.array.isRequired
		, isFetching: PropTypes.bool.isRequired
		, lastUpdated: PropTypes.instanceOf(Date)
		, fetchSubreddit: PropTypes.func.isRequired
		, selectSubreddit: PropTypes.func.isRequired
		, invalidateSubreddit: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.handleRefreshClick = this.handleRefreshClick.bind(this)
	}

	componentDidMount() {
		const 
			{ selectedSubreddit
			, fetchSubreddit 
			} = this.props
		fetchSubreddit(selectedSubreddit);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedSubreddit === this.props.selectedSubreddit) { return;}
		const 
			{ selectedSubreddit
			, fetchSubreddit
			} = nextProps
		fetchSubreddit(selectedSubreddit);
	}

	handleChange(nextSubreddit) {
		this.props.selectSubreddit(nextSubreddit);
	}

	handleRefreshClick(e) {
		e.preventDefault();
		const 
			{ selectedSubreddit
			, fetchSubreddit
			, invalidateSubreddit 
			} = this.props
		invalidateSubreddit(selectedSubreddit);
		fetchSubreddit(selectedSubreddit);
	}

	render() {
		const 
			{ selectedSubreddit
			, items
			, isFetching
			, lastUpdated 
			} = this.props;
		return (<Source text={require('../readme')} code={require('!!raw!../data')}>
			<Picker value={selectedSubreddit}
				onChange={this.handleChange}
				options={[ 'reactjs', 'frontend' ]} 
			/>
			<p>
				{lastUpdated &&
					<span>
						Last updated at {lastUpdated.toLocaleTimeString()}.
						{' '}
					</span>
				}
				{!isFetching &&
					<a href='#'
							onClick={this.handleRefreshClick}>
						Refresh
					</a>
				}
			</p>
			{isFetching && items.length === 0 &&
				<h2>Loading...</h2>
			}
			{!isFetching && items.length === 0 &&
				<h2>Empty.</h2>
			}
			{items.length > 0 &&
				<div style={{ opacity: isFetching ? 0.5 : 1 }}>
					<RedditPosts posts={items} />
				</div>
			}
		</Source>);
	}
}