import * as React from 'react'
import {Component} from 'react';

const AddTodo = ({ todosAdd }) => {
	let input

	return (
		<div>
			<form onSubmit={e => 
				{
					e.preventDefault()
					if (!input.value.trim()) {
						return
					}
					todosAdd(input.value);
					input.value = ''
				}
			}>
				<input ref={node => 
					{ input = node
					}
				} />
				<button type="submit">
					Add Todo
				</button>
			</form>
		</div>
	)
}

export default AddTodo;