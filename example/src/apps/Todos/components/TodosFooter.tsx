import * as React from 'react'
import {VISIBILITY_FILTERS} from '../../consts';
import FilterLink from '../FilterLink'

const TodosFooter:React.StatelessComponent<void> = () => 
	( <p>
		Show:
		{" "}
		<FilterLink filter={VISIBILITY_FILTERS.SHOW_ALL}>
			All
		</FilterLink>
		{", "}
		<FilterLink filter={VISIBILITY_FILTERS.SHOW_ACTIVE}>
			Active
		</FilterLink>
		{", "}
		<FilterLink filter={VISIBILITY_FILTERS.SHOW_COMPLETED}>
			Completed
		</FilterLink>
	</p>)
;

export default TodosFooter