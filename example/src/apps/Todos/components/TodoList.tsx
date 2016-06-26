import * as React from 'react'
import { PropTypes }  from 'react';
import Todo from './Todo'

export interface TodoItemShape{
	id:number;
	completed:boolean;
	text:string;
}

export interface TodoListPropTypes{
	todos:TodoItemShape[];
	onTodoClick:(id:number)=>void;
}

const TodoList:React.StatelessComponent<TodoListPropTypes> = ({ todos, onTodoClick }) => 
	(
		<ul>
			{ todos.map(todo =>
				<Todo
					key={todo.id}
					{...todo}
					onClick={() => onTodoClick(todo.id)}
				/>
			)}
		</ul>
	)

TodoList.propTypes = 
	{ todos: PropTypes.arrayOf
		( PropTypes.shape
			(
				{ id: PropTypes.number.isRequired
				, completed: PropTypes.bool.isRequired
				, text: PropTypes.string.isRequired
				}
			).isRequired
		).isRequired
	, onTodoClick: PropTypes.func.isRequired
	};

export default TodoList