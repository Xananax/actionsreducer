import * as React from 'react';
import * as classnames from 'classnames';
import NavLink,{NavLinkPropTypes} from './components/NavLink';

const style = require('./Nav.styl');

export interface NavPropTypes{
	links:NavLinkPropTypes[];
	title:string;
	className?:string;
}

const Nav:React.StatelessComponent<NavPropTypes> = ({links,title,className}) => (
	<div className={classnames(
			[ style.Nav
			, style[className]
			])}
		>
		<ul>
			{ title && (<li><h1>{title}</h1></li>) }
			{
				links.map(({name,to})=><li key={to}><NavLink to={to} name={name}/></li>)
			}
		</ul>
	</div>
)

export default Nav;