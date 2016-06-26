import { connect } from 'react-redux'
import { actions } from '../data'
import Link from './components/Link'

const 
	{ todosFilter
	} = actions;

const mapStateToProps = ({todos}, ownProps) => (
	{ active: ownProps.filter === todos.visibilityFilter
	})


const mapDispatchToProps = (dispatch, ownProps) => (
	{ onClick: () => 
		{
			dispatch(todosFilter(ownProps.filter))
		}
	});

const FilterLink = connect
	( mapStateToProps
	, mapDispatchToProps
	)(Link)

export default FilterLink;