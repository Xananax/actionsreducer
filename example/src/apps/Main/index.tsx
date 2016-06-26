import * as React from 'react'
import Nav from  '../Nav';
import apps from '../pages';
import pages from '../Page/pages';

function toUpper(name:string):string{
	return name.slice(0,1).toUpperCase()+name.slice(1);
}

function makeTitle(str:string):string{
	return str.split('_').map(toUpper).join(' ');
}

const links = Object.keys(pages)
	.filter(name=>name!='404')
	.map((name) =>(
		{ name:makeTitle(name)
		, to:`page/${name}`
		})
	);

const Main = ({children=null}) => (
	<div>
		<Nav links={links} title="ActionsReducer" className="main"/>
		<Nav links={apps} title="examples" className="examples"/>
		{children}
	</div>
)

export default Main