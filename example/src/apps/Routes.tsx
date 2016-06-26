import * as React from 'react';
import 
	{ Route
	, Redirect
	, IndexRoute
	} from 'react-router';

import Main from './Main';
import Page from './Page';
import pages from './pages';


const Routes = (
	<Route path="/" component={Main}>
		<IndexRoute component={Page} />
		<Route path='/page(/:page)' component={Page}>
			<Redirect from="*" to='404' />
		</Route>
		{ pages.map(({to,app})=><Route key={to} path={to} component={app}/>
		)}
		<Redirect from="*" to="page" />
	</Route>
)

export default Routes;