import * as React from 'react';

export interface HTMLPropTypes{
	text:string;
}


const wrap = (__html:string) => ({__html});

const HTML:React.StatelessComponent<HTMLPropTypes> = ({text}) => (
	<div>
		<div dangerouslySetInnerHTML={wrap(text)}/>
	</div>
)

export default HTML;