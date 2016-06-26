import { connect } from 'react-redux'
import { actions } from '../data'
import AddTodo from './components/AddTodo';

const 
	{ todosAdd
	} = actions;

const mapDispatchToProps = (dispatch, ownProps) => (
	{ todosAdd: (text) => dispatch(todosAdd(text))
	});


export default connect
	( null
	, mapDispatchToProps
	)(AddTodo);
