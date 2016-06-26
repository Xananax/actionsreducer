import * as React from 'react'
import TodosFooter from './components/TodosFooter'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'
import Wrapper from '../Wrapper';

const Todos = () => (
	<Wrapper name="todos" text={require('./readme')} source={require('!!raw!./data')}>
		<AddTodo />
		<VisibleTodoList />
		<TodosFooter />
	</Wrapper>
)

export default Todos;