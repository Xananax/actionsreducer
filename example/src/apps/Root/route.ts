import 
	{ Router
	//, browserHistory as history
	, hashHistory as history
	, match
	} from 'react-router';

const makeRoutes = (routes:any) => (callback:(routerProps:ReactRouter.MatchState)=>void) => {
	match(
		{ history
		, routes
		}
	,	(error, redirectLocation, routerProps) => callback(routerProps)
	);
}

export default makeRoutes;
