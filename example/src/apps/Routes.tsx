import * as React from 'react';
import 
	{ Route
	, Redirect
	, IndexRoute
	} from 'react-router';

import Main from './Main';
import Pages from './Pages';
import Reddit from './Reddit';
import Todos from './Todos';
import pagesRoutes from './Pages/routes';

const NotFound = () =>(
	<div>404</div>
)

export const apps = [
		{ name:'Todos Example'
		, to:'todos'
		, app:Todos
		}
	,	{ name:'Reddit Example'
		, to:'reddit'
		, app:Reddit
		}
	]


const Routes = (
	<Route path="/" component={Main}>
		<IndexRoute component={Pages} />
		{ apps.map(({to,app})=><Route key={to} path={to} component={app}/>
		)}
		<Route path="page">
			{pagesRoutes}
		</Route>
		<Route path="404" component={Pages} />
		<Redirect from="*" to="404" />
	</Route>
)

export default Routes;