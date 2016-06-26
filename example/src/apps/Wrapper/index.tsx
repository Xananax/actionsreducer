import * as React from 'react';
import {Children} from 'react';
import * as classnames from 'classnames';
import Source from '../Source';
import HTML from '../HTML';
const count = Children.count;

const style = require('./Wrapper.styl');

const Wrapper = ({text='',source='',children=null,name=''})=> (text || source || count(children)) && (
	<div className={classnames(
		[ style.Wrapper
		, style[name]
		]
		)}>
		{text && <HTML text={text}/>}
		{source && <Source code={source}/>}
		{children}
		<hr/>
	</div>);

export default Wrapper;