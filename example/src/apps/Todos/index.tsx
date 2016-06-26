import * as React from 'react'
import TodosFooter from './components/TodosFooter'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'
import Source from '../Source';

const Todos = () => (
	<Source text={require('./readme')} code={require('!!raw!./data')}>
		<AddTodo />
		<VisibleTodoList />
		<TodosFooter />
	</Source>
)

export default Todos;