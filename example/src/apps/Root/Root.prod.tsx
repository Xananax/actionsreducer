import * as React from 'react';
import { Provider } from 'react-redux'
import configureStore from '../../store/store.prod';
import routes from '../Routes';
import makeRoutes from './route';
import { Router } from 'react-router';

const store = configureStore();

export const Root = ({routerProps}) => (
	<Provider store={store}>
		<div>
			<Router {...routerProps} />
		</div>
	</Provider>
);

export const route = makeRoutes(routes);