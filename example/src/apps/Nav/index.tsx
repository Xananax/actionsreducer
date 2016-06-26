import * as React from 'react';
import * as classnames from 'classnames';
import { Link } from 'react-router';

const style = require('./Nav.styl');

function onClick(name,change){
	return function(e){
		e.preventDefault();
		change(name);
	}
}

export interface NavPropTypes{
	links:{to:string,name:string}[];
	title:string;
}

const Nav:React.StatelessComponent<NavPropTypes> = ({links,title}) => (
	<ul className={style.Nav}>
		<Link to={`/page/`}>page</Link>
		{
			links.map(({name,to})=><li key={to}><Link to={`/${to}`}>{name}</Link></li>)
		}
	</ul>
)

export default Nav;