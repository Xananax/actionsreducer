export default function requireAll(require:NodeRequireContext)
	{
		const modules = {}; 
		const keys = require.keys();
		keys.forEach(function(key){
			const name = key.replace(/\.\//,'').split('.').slice(0,-1).join('.');
			modules[name] = require(key);
		});
		return modules;
	}