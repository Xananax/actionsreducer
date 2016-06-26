import * as React from 'react'
import { connect } from 'react-redux'
import { actions } from '../data'
import { MODE } from './data';
import * as classnames from 'classnames';
import Wrapper from '../Wrapper';
import 
	{ GistsFetcherActions
	, GistsFetcherProps
	, GistsFetcherPropTypes
	} from './GithubDefinitions';

const 
	{ gitSet
	, gitCall
	} = actions;

function modeToText(mode:MODE):string{
	switch(mode){
		case MODE.DONE: return 'loaded';
		case MODE.ERROR:return 'error!';
		case MODE.LOADING: return 'loading...';
		case MODE.NOTHING:
		default: 
			return 'idle';
	}
}

const GistsFetcher:React.StatelessComponent<GistsFetcherPropTypes> = ({name,mode,error,gists,set,get}) => (
	<Wrapper text={require('./readme')} source={require('!!raw!./data')} name="github">
		<h3> Status: {modeToText(mode)}</h3>
		<form onSubmit={e=>{e.preventDefault();get();}}>
			<input value={name} onChange={(e)=>set((e.target as HTMLInputElement).value)}/>
			<input type="submit" value="fetch!"/>
		</form>
		<div>
			{ error && <div>{error.message}</div>}
		</div>
		{ gists.length && 
			<ul>
				{ gists.map(({url,title})=><li key={url}><a href={url} target="_BLANK">{title}</a></li>)
				}
			</ul> || 
			<span>nothing loaded</span>
		}
	</Wrapper>
);

const mapStateToProps = ({git}):GistsFetcherProps => git;
	
const mapDispatchToProps = (dispatch):GistsFetcherActions => (
	{ set:(name)=>dispatch(gitSet(name))
	, get:()=>dispatch(gitCall())
	});

export default connect(mapStateToProps,mapDispatchToProps)(GistsFetcher);