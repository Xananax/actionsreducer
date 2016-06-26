import * as React from 'react';
import {Component,PropTypes} from 'react';
import * as classnames from 'classnames';
import { Link } from 'react-router';

const style = require('./NavLink.styl')

export interface NavLinkPropTypes{
	to:string;
	name:string;
}

export default class NavLink extends Component<NavLinkPropTypes,any>{
	static contextTypes = 
		{ router: PropTypes.object
		};

	static propTypes = 
		{ to:PropTypes.string
		, name:PropTypes.string
		};

	context:{router:ReactRouter.RouterOnContext}
	
	render() 
		{
			const {props,context} = this;
			const {to,name} = props;
			const isActive = context.router.isActive(to, true);
			const className = classnames(
				[ isActive && style.active
				, style.NavLink
				]);

			return (
				<Link {...this.props} className={className}>{name}</Link>
			);
		}
};