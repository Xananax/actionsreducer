import * as React from 'react';
import {Children} from 'react';
const count = Children.count;

const Wrapper = ({children=null,name=''})=> count(children) && (
	<div className={`wrapper ${name?` wrapper-${name}`:''}`}>
		{children}
		<hr/>
	</div>);

export default Wrapper;