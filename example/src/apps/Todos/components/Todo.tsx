import * as React from 'react'
import { PropTypes } from 'react';


export interface TodoPropTypes{
	onClick:Function;
	completed:boolean;
	text:string;
}

const Todo:React.StatelessComponent<TodoPropTypes> = ({ onClick, completed, text }) => 
	(
		<li
			onClick={onClick}
			style={
				{ textDecoration: completed ? 'line-through' : 'none'
			}}
		>
			{text}
		</li>
	)

Todo.propTypes = 
	{ onClick: PropTypes.func.isRequired
	, completed: PropTypes.bool.isRequired
	, text: PropTypes.string.isRequired
	};

export default Todo;