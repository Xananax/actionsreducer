# ActionsReducer

[Website and Examples](https://xananax.github.io/actionsreducer)

Helpers to create actions and reducers for [Redux](https://github.com/reactjs/redux).

Actionsreducer simplifies:
 
 - The creation of actions, state, reducers; you create all three in one fell swoop.
 - The creation of async actions (must use [redux-thunk](https://github.com/gaearon/redux-thunk))
 - Return values: 
 	- values are automatically re-assigned to state at the right location, no need for reducers composition. 
 	- Returning null, or an unchanged value, cancels an update. 
	- Reducers can be infinitely nested (more than one level of nesting is discouraged, but possible) 

Furthermore, the ActionsReducer project itself demonstrates:

 - typescript + babel + webpack usage with browser and node bundles
 - karma + mocha + chai testing

## Usage

```bash
npm install --save actionsreducer
```

also, in case you don't have, already:

```bash
npm install --save redux react-redux redux-thunk
```

then


```javascript
// data.js
import actionsreducer from 'actionreducer';

const [reducer,state,actions] = actionsreducer({
	timer:{
		state:{
			dates:[]
		},
		actions:{
			now:(state)=>[...state,Date.now()]
		}
	}
,	counter:{
		state:{
			value:0
		},
		actions:{
			inc:({value})=>({value:value++}),
			dec:({value})=>({value:value--}),
			reset:()=>({value:0})
		}
	}
});

console.log(reducer) //> function reducer(state,action){...}
console.log(state) //> {timer:[],counter:{value:1}}
console.log(actions) //> {timerNow:function,counterInc:function,counterDec:function,counterReset:function}

```
This will do the following:
 - create a `reducer` that can be used by Redux. This reducer is fully compatible with `combineReducers` and other niceties
 - create an initial state that combines all the sub-states
 - create action creators that returns [Flux Standard Actions](https://github.com/acdlite/flux-standard-action). The actions
will be, in this case, called `timerNow`, counterInc`, `counterDec` and `counterReset`, and will dispatch the respective `TIMER_NOW`, `COUNTER_INC`, `COUNTER_DEC`, and `COUNTER_RESET` actions. 



-------

## Example

There are several examples included with Actionsreducer.

To run them:

 - clone the repo `git clone https://github.com/Xananax/actionsreducer.git && cd actionsreducer`
 - install needed dev modules: `npm install`
 - install typescript typings: `npm run typings`
 - run the example server: `npm start`

Too lazy? Here's an example for your reading pleasure:

```javascript
// data.js
import actionsreducer from 'actionreducer';

let ids = 0;
const getId = ()=>ids++;

const [reducer,state,actions] = actionsreducer({
	visibility:{
		state:'ALL'
		actions:{
			filter:(state,filter)=>filter
		}
	}
,	todos:{
		state:[]
		actions:{
			add:(todos,text)=>(
				[...todos,{ text, id:getId(), completed:false}]
			)
		,	remove(todos,id)=>todos.filter(
				todo=>todo.id!=id
			)
		,	complete(todos,id)=>todos.map(
				todo=>todo.id==id ? 
					Object.assign(todo,{completed:!todo.completed}) :
					todo
			)
		}
	}
});

export {reducer,state,actions};


// later, in 'configureStore.js':

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {reducer,state} from './data'

const store = createStore( 
	reducer, 
	state, 
	applyMiddleware(thunkMiddleware)
);


// in your app, 'App.jsx':
import * as React from 'react'
import { connect } from 'react-redux'
import {actions} from './data'

const {
	todosAdd,
	todosRemove,
	todosComplete,
	visibilityFilter
	} = actions;

const Todo = ({text,id,completed,remove,complete}) =>(
	<div id={`todo_${id}`}>
		<input type='checkbox' checked={completed} onClick={()=>complete(id)}/>
		<span>{text}</span>
		<button onClick={()=>remove(id)}>delete</button>
	</div>
)

const Link = ({filter,visibility,text,onClick}) =>(
	(visibility == filter) ? 
		(<span>{text}</span>) : 
		(<a href="#" onClick={e=>{e.preventDefault();onClick(filter)}}>{text}</a>)
)

const Todos = ({visibility,todos,add,remove,complete,show}) => {
	let input;
	function onSubmit(e){
		e.preventDefault();
		const value = input.value.trim();
		if (!value) {return;}
		add(value);
		input.value = ''
	}
	return (<ul>
		<form onSubmit={onSubmit}>
			<input type='text' ref={node=>{input = node}}/>
			<button type="submit">add</button>
		</form>
		<label>
			<Link text='all' filter={'ALL'} onClick={show} visibility={visibility}/>
			<Link text='all' filter={'COMPLETE'} onClick={show} visibility={visibility}/>
			<Link text='all' filter={'UNCOMPLETE'} onClick={show} visibility={visibility}/>
		</label>
		{ todos.map(todo=>(
			<Todo ...todo remove={remove} complete={complete}/>
		))}
	</ul>);
}

function mapStateToProps({visibility,todos},ownProps){
	return {
		visibility,
		todos:(
			(visibility == 'COMPLETE') ? todos.filter(todo=>todo.completed) :
				(visibility == 'UNCOMPLETE') ? todos.filter(todo=>!todo.completed) :
				todos
		)
	}
}

function mapDispatchToProps(dispatch){
	return {
		add:(text)=>todosAdd(text)
	,	remove(id)=>todosRemove(id)
	,	complete(id)=>todosComplete(id)
	,	show(filter)=>visibilityFilter(filter)
	};
}

export default connect(mapeStateToProps,mapDispatchToProps)(Todos);

```

....And voilà! The full redux example.

Admittedly, I've cheated a bit because the todos store is very brittle.

But here's another options: actionsreducer comes with an easy to use store creator.

You use is by just calling `simpleStore(factory,makeConfig)`.

- `factory` is a function that is used when adding an object.
- `makeConfig` is called once and returns a structure similar to the above.

Both are optional.

Here's an example:

```javascript
import actionsreducer,{ simpleStore, assign } from 'actionsreducer';

const [reducer,state,actions] = actionsreducer({
	visibility:{
		state:'ALL'
		actions:{
			filter:(state,filter)=>filter
		}
	}
,	todos:simpleStore(
		(id,text)=>{
			return { 
				id,
				text,
				completed:false
			}
		},
		({state,add,addMany,remove,update,toggle,get},edit)=>(
			{ 
				state:addMany(state, [ { text: 'My first todo!' }]),
				actions:{ 
					add:(state,text)=>add(state,{text}), // `add` expects an object of functions
					remove,
					complete:(state,id)=>toggle(state,{id,prop:'completed'})
				}
			}
		)
	)
});
```

Async actions are possible too:

```javascript
const [reducer,state,actions] = actionsreducer({
	//...
	notes:{
		state:{
			notes:[]
		,	status:'nothing'
		}
		actions:{
			add:{ 
				_(state,payload,meta,actions,dispatch,type){
					if(payload == 'error'){
						return actions.error('error triggered by you!');
					}
					return new Promise((resolve,reject)=>{
						setTimeout(()=>{resolve('a new note')},500);
					})
				}
			,	started(state,payload){
					return {status:'loading'}
				}
			,	success({notes},text){
					return {
						notes:notes.concat([{text}])
					}
				}
			,	error(state,payload){
					return {status:'error'}
				}
			}
		}
	}
	//...
})
```

## API

There's only one important function: 

```javascript
actionsreducer(config)=>[reducer,state,actions];
````

### Config

is an object of `stateChunks`

#### StateChunk

Signature:
```javascript
{
	state:any
,	actions:{
		[name:string]:ActionProcessor | AsyncActionProcessor | StateChunk
	}
}
```

`StateChunk`s can be nested; If a `StateChunk` is nested in another, then it will receive only the relevant part of state.

in other words, this:

```javascript
{
	// ...
	store{
		state:{}	error?:ActionProcessor;
	started?:ActionProcessor;
	cancelled?:ActionProcessor;
		actions:{
			subState:{
				state:[]
			,	actions:{
					doSomething(){}
				}
			}
		}
	}
	// ...
}
``` 
will resolve to a state `{store:{subState:[]}}` and to the action creator `actions.storeSubStateDoSomething()` which will dispatch the action `STORE_SUBSTATE_DOSOMETHING`.


#### ActionProcessor

```javascript
someAction(state:any,payload?:any,meta?:any,type?:string)=>state
```

This will transform into:

	- an `ActionCreator` called `someAction` which will dispatch an action of type `'SOMEACTION'`
	- a reducer `SOMEACTION` that will be called upon dispatching the action  

Note that an action processor does not need to return the whole state it is passed. It only needs to return the part that it is concerned with.  
Anything returned will extend the current state. A new state will be created if necessary (if the returned value is different from the previous one). Note, however, that this operation is **not** recursive.

Returning `null`, `false`, or the `CANCEL` symbol (available as an export, `import {CANCEL} from 'actionsreducer'` will short-circuit the operation. There is no benefit in returning `CANCEL`, only more code clarity.

#### AsyncActionProcessor

```javascript
{
	_ : ( state:any, payload:any, meta:any, actions, dispatch, type:string )=>any;
,	success:ActionProcessor
,	error?:ActionProcessor
,	started?:ActionProcessor
,	cancelled?:ActionProcessor
}
```
The function `'_'` is your async function. It's expected to return a Promise, but if you don't, what you return will be promisified.  
Returning an Error, or `reject`ing a Promise will trigger the `error` ActionProcessor. returning `null`, `false`, or the `CANCEL` constant (available as an export `import {CANCEL} from 'actionsreducer'`) will trigger the `cancel` action.    
`started` will be called as soon as you run the async function;  
`success`, the only required member besides `'_'`, will be called if the async function returns a truthy value or a `resolve`d Promise.

Additionally to the regular `state`, `payload`, and `meta`, an AsyncActionProcessor receives an `actions` object which contains:

 - `actions.success(any)`: dispatches the success action
 - `actions.error(any)`: dispatches the error action
 - `actions.cancelled(any)`: dispatches the cancelled action

Just like a sync ActionCreator, an AsyncActionCreator does not need to return the whole state, but only the part it is concerned with.

### Returned Objects

`actionsreducer` returns an array `[reducer,state,actions]`.

#### Reducer

```javascript
(state,action)=>state
```

A regular Redux reducer. The reducer takes care of checking for equality (with `==`) and of not updating if nothing is returned.

#### State

```javascript
{
	[name:string]:any
}
```

The combined state of all the passed StateChunks


#### Actions

```javascript
{
	[name:string]:ActionCreator
}
```
An object of all ActionCreators. ActionCreators names are generated by `path+actionName`, where `path` is the whole set of previous StateChunks, and `actionName` is the key of the particular ActionProcessor.

If you have a deeply nested actionProcessor, this can result in `forumRoomsUsersActiveSelect`, which is one more reason to try to keep the state as flat as possible.

#### ActionCreator

```javascript
actionCreator(payload:any,meta?:any,err?:boolean)=>Action
```

Returns an action. the object containing all `ActionCreator`s can be found on the third element of the array returned by `actionsreducer`.
If `err` is set to true, then whatever `payload` is will be transformed into an Error (unless it's already an Error)


## Development

Oh please yes. I could use some help.

There's no coding guidelines, as long as it's readable, anything goes.

Just submit a ticket, fork, PR.

```bash
git clone https://github.com/Xananax/actionsreducer.git && cd actionsreducer &&\
npm install &&\
npm run typings
```

Then:

 - test: `npm test`
 - test & exit: `npm run test:once`
 - compile browser: `npm run build:client`
 - compile for server: `npm run build:server`
 - compile everything `npm run dist`
 - run examples: `npm start` (you can specify the port: `PORT=3000 npm start`, defaults to `8080`)
 - build examples: `npm run build:example`.

## Tests

Very lacking for the moment, but coming soon...

```bash
npm test
```

## License

The MIT License (MIT)
Copyright (c) 2016 Jad Sarout

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.