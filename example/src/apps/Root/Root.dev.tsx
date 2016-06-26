import * as React from 'react';
import { Provider } from 'react-redux'
import configureStore from '../../store/store.dev';
import routes from '../Routes';
import makeRoutes from './route';
import { Router } from 'react-router';

import 
	{ DevTools
	, USE_DEVTOOLS_EXTENSION
	} from './DevTools';

const store = configureStore();
const conf = {routes}

export const route = makeRoutes(routes);

export interface RootProps{
	routerProps:ReactRouter.MatchState;
}

export const Root:React.StatelessComponent<RootProps> = ({routerProps}) => (
	<Provider store={store}>
		<div>
			<Router {...routerProps} />
			{ !USE_DEVTOOLS_EXTENSION && <DevTools /> }
		</div>
	</Provider>
)

if(module.hot) {
	module.hot.accept("../Routes",()=>{
		conf.routes = require('../Routes').default;
	});
}
