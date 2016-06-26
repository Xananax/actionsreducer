import * as React  from 'react';
import { PropTypes } from 'react';

export interface LinkProps{
	active:boolean;
	children:React.Component<any,any>
	onClick:()=>void;
}

const Link:React.StatelessComponent<LinkProps> = ({ active, children, onClick }) =>
	( 
		(active) ?
			(<span>
				{children}
			</span>) :
			(<a href="#"
				onClick={e => 
					{
						e.preventDefault()
						onClick()
					}
				}
			>
				{children}
			</a>)
	)

Link.propTypes = 
	{ active: PropTypes.bool.isRequired
	, children: PropTypes.node.isRequired
	, onClick: PropTypes.func.isRequired
	};

export default Link