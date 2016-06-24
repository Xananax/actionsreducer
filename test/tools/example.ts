import data from './data';
import fetch from './fakeFetch';
import makeDispatch from './makeDispatch';


const [dispatch,actions] = makeDispatch(data);

console.log('----')
console.log(actions);
//console.log('----')
//console.log(state);

//dispatch(actions['notesAdd']({name:'blah'}));
//dispatch(actions['apiCall']({page_name:'a',app_id:'b',app_secret:'c'}));
