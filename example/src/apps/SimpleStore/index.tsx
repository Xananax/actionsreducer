import * as React from 'react'
import { connect } from 'react-redux'
import { actions } from '../data'
import { VISIBILITY } from './data';
import * as classnames from 'classnames';
import Wrapper from '../Wrapper';

const style = require('./SimpleStore')

const 
	{ storeAdd
	, storeRemove
	, storeComplete
	, storeFilter
	, storeOrder
	, storeMode
	, storeChange
	, storeNest
	} = actions;

const makeSubmit = (refs,add) => (e) => 
	{
		e.preventDefault();
		const value = refs.input.value.trim();
		if (!value) {return;}
		add(value);
		refs.input.value = ''
	}

const makeChange = (refs,show) => (e) => {
		e.preventDefault();
		show(e.target.value);
	}

interface StoreActions{
	actions:{
		add:(text:string)=>any;
		remove:(id:number)=>any;
		complete:(id:number)=>any;
		show:(filter:string)=>any;
		reorder:(id1:number,id2:number)=>any;
		mode:(id:number)=>any;
		change:(id:number,text:string)=>any;
		nest:(id:number,parentId:number)=>any;
	}
}

interface StoreItems{
	visibility:number;
	items:{ id:number
	, text:string
	, completed:boolean
	, order:number
	, view_mode:boolean
	, nesting:number
	}[];
}

type StoreProps = StoreActions & StoreItems;

const Item = ({id,completed,text,order,view_mode,index,previous,next,nesting,actions:{nest,change,remove,complete,reorder,mode}})=>(
	<div key={id} id={`item_${id}`} className={classnames([completed && style.completed,style.Item])}>
		<span className={classnames([style.spacer,style[`spacer-${nesting}`]])}/>
		<input type='checkbox' checked={completed} onChange={()=>complete(id)}/>
		{

		}
		{ view_mode ?
			
			<span onDoubleClick={()=>mode(id)} tabIndex={0}>
				{text}
			</span> :
			<form onSubmit={(e)=>{e.preventDefault();mode(id);}}>
				<input type="text" value={text} onChange={(e)=>change(id,(e.target as HTMLInputElement).value)} onBlur={()=>mode(id)}/>
			</form>
		}
		<div className={style.buttons}>
			<button className={style.right} disabled={!previous} onClick={()=>nest(id,previous.id)}>→</button>
			<button className={style.up} disabled={!previous} onClick={()=>reorder(id,previous.id)}>↑</button>
			<button className={style.down} disabled={!next} onClick={()=>reorder(id,next.id)}>↓</button>
			<button className={style.remove} onClick={()=>remove(id)}>×</button>
		</div>
	</div>);

const Store:React.StatelessComponent<StoreProps> = ({items,actions,visibility}) => {
	const refs = 
		{ input:null
		, select:null
		}
	
	return (<Wrapper text={require('./readme')} source={require('!!raw!./data')} name="simplestore">
		<form onSubmit={makeSubmit(refs,actions.add)}>
			<label htmlFor="SimpleTodoInput">Add a Todo </label>
			<input type='text' ref={node=>{refs.input = node}} id="SimpleTodoInput"/>
		</form> 
		<select onChange={makeChange(refs,actions.show)} 
			ref={node=>refs.select = node}
			selected={visibility}
			className={style.select}
			>
			<option value={VISIBILITY.ALL}>show all</option>
			<option value={VISIBILITY.COMPLETED}>show done</option>
			<option value={VISIBILITY.UNCOMPLETED}>show pending</option>
		</select>
		{ items.map((item,index)=><Item key={item.id} {...item} index={index} actions={actions} previous={items[index-1]} next={items[index+1]}/>)}
	</Wrapper>);
}

function mapStateToProps({store:{byId,visibility}},ownProps):StoreItems{
	return (
		{ visibility
		, items:(visibility == VISIBILITY.ALL ? 
			byId :
			visibility == VISIBILITY.COMPLETED ?
				byId.filter(item=>item.completed) :
				byId.filter(item=>!item.completed)
		).sort(({order:a},{order:b})=>((a > b)?1:(a < b)?-1:0))
	})
}

function mapDispatchToProps(dispatch):StoreActions{
	return ({
		actions:{ add:(text)=>dispatch(storeAdd(text))
			, remove:(id)=>dispatch(storeRemove(id))
			, complete:(id)=>dispatch(storeComplete(id))
			, show:(filter)=>dispatch(storeFilter(filter))
			, reorder:(id1,id2)=>dispatch(storeOrder({id1,id2}))
			, mode:(id)=>dispatch(storeMode(id))
			, change:(id,text)=>dispatch(storeChange({id,text}))
			, nest:(id1,id2)=>dispatch(storeNest({id1,id2}))
		}
	});
}

export default connect(mapStateToProps,mapDispatchToProps)(Store);