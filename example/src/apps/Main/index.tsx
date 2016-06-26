import Wrapper from './components/Wrapper';
import * as React from 'react'
import Nav from  '../Nav';
import apps from '../pages';
import pages from '../Pages/pages';

function toUpper(name:string):string{
	return name.slice(0,1).toUpperCase()+name.slice(1);
}

function makeTitle(str:string):string{
	return str.split('_').map(toUpper).join(' ');
}

const links = Object.keys(pages)
	.filter(name=>name!='notFound')
	.map((name) =>(
		{ name:makeTitle(name)
		, to:`page/${name}`
		})
	)
	.concat(apps);

const Main = ({children=null}) => (
	<div>
		<Nav links={links} title="Action Reducers"/>
		<Wrapper name="todos">
			{children}
		</Wrapper>
	</div>
)

export default Main