import * as React from 'react';
import {Component} from 'react';
import * as classnames from 'classnames';

const style = require('./Source.styl');

export interface SourcePropTypes{
	text:string;
	code:string;
} 

export interface SourceState{
	hidden:boolean
}

export default class Source extends Component<SourcePropTypes,SourceState>{

	constructor(props,context){
		super(props,context);
		this.state = {hidden:true};
		this.onClick = this.onClick.bind(this);
	}

	onClick(e){
		e.preventDefault();
		const hidden = !this.state.hidden;
		this.setState({hidden});
	}

	render(){
		const {text,code,children} = this.props;
		const {hidden} = this.state;
		const hideLinkText = hidden ? 'show' : 'hide';
		const className = classnames(
			[ style.Source
			, hidden && style.hidden
			]);
		return (
			<div className={className}>
				<div className={style.text} dangerouslySetInnerHTML={{__html:text}}/>
					{children}
				<div className={style.code}>
					<a href="#" onClick={this.onClick}>
						{hideLinkText} source
					</a>
					<pre>
						<code>
							{code}
						</code>
					</pre>
				</div>
			</div>
		)
	}

}