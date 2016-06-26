import * as React from 'react'
import { Route, Redirect, IndexRoute} from 'react-router'
import Page from './';
import pages from './pages';

const routes = (
	<Route>
		<IndexRoute component={Page} />
		<Route path="/:page" component={Page}/>
		<Redirect from="/" to="/intro" />
		<Redirect from="*" to="/notFound" />
	</Route>
);

export default routes;