import { connect } from 'react-redux'
import { actions } from '../data'
import { VISIBILITY_FILTERS } from '../consts'
import TodoList from './components/TodoList'

const
	{ todosComplete
	} = actions;

const getVisibleTodos = (todos, filter) => 
	{
		switch (filter) {
			case VISIBILITY_FILTERS.SHOW_COMPLETED:
				return todos.byId.filter(t => t.completed)
			case VISIBILITY_FILTERS.SHOW_ACTIVE:
				return todos.byId.filter(t => !t.completed)
			case VISIBILITY_FILTERS.SHOW_ALL:
			default:
				return todos.byId
		}
	}

const mapStateToProps = ({todos}) => (
	{ todos: getVisibleTodos(todos, todos.visibilityFilter)
	});

const mapDispatchToProps = (dispatch) => (
	{ onTodoClick: (id) => 
		{
			dispatch(todosComplete(id))
		}
	});

const VisibleTodoList = connect
	( mapStateToProps
	, mapDispatchToProps
	)(TodoList);

export default VisibleTodoList;