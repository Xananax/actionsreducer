import * as React from 'react';
import {Component} from 'react';
import * as classnames from 'classnames';
import getPrism from '../../vendor/Prism';

const Prism = getPrism('typescript','funky');

const style = require('./Source.styl');

export interface SourcePropTypes{
	code:string;
	hidden?:boolean;
	language?:string;
} 

export interface SourceState{
	hidden:boolean
}

export default class Source extends Component<SourcePropTypes,SourceState>{

	constructor(props,context){
		super(props,context);
		this.state = 
			{ hidden:('hidden' in props) ? !!props.hidden : true 
			};
		this.onClick = this.onClick.bind(this);
	}

	onClick(e){
		e.preventDefault();
		const hidden = !this.state.hidden;
		this.setState({hidden});
	}

	render(){
		const {code,language} = this.props;
		const {hidden} = this.state;
		const hideLinkText = hidden ? 'show' : 'hide';
		const className = classnames(
			[ style.Source
			, hidden && style.hidden
			]);
		const markup = `language-${language?language:'typescript'}`;
		const highlighted = Prism.highlight
			( code.replace('../../../../src','actionreducer')
			, Prism.languages['typescript']
			);

		return (
			<div className={className}>
				<a href="#" onClick={this.onClick} className={style.link}>
					{hideLinkText} source
				</a>
				<pre className={markup}>
					<code className={markup} dangerouslySetInnerHTML={{__html:highlighted}}>
					</code>
				</pre>
			</div>
		)
	}

}