let store;
if (process.env.NODE_ENV === 'production') {
	store = module.exports = require('./store.prod');
}
else {
	store = module.exports = require('./store.dev');
}

export default store;