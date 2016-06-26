import * as React from 'react';
import {render} from 'react-dom';
import Root from './apps/Root';

Root.route((routerProps)=>{
	render
		( <Root routerProps={routerProps}/>
		, document.getElementById('Root')
		);
})