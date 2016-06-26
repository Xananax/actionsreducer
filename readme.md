# ActionsReducer

Helpers to create actions and reducers for [https://github.com/reactjs/redux](Redux).

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

```sh
npm install --save actionsreducers
```

then


```js
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
 - run the example server: `npm run example`

Too lazy? Here's an example for your reading pleasure:

```js
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

```js
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

## Development

Oh please yes. I could use some help.

There's no coding guidelines, as long as it's readable, anything goes.

Just submit a ticket, fork, PR.

```sh
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
 - run examples: `npm run example` (you can specify the port: `PORT=3000 npm run example`)
 - build examples: `npm run build:example`.

## Tests

Very lacking for the moment, but coming soon...

```sh
npm test
```

## License

The MIT License (MIT)
Copyright (c) 2016 Jad Sarout

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.