let Root;
let route;

if (process.env.NODE_ENV === 'production') {
	const conf = require('./Root.prod');
	Root = conf.Root;
	route = conf.route;
}
else {
	const conf = require('./Root.dev');
	Root = conf.Root;
	route = conf.route;
}

Root.route = route;

export default Root;
