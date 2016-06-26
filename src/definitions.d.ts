
declare namespace AR_Utils{

	export interface Obj<TYPE>{
		[name:string]:TYPE;
	}


}

declare namespace AR_Conf{

	export type SnakeCasedString = string

	export type CapitalizedString = string;

	export interface Config extends AR_Utils.Obj<StateChunk>{}

	export interface StateChunk{
		state:any;
		actions:Actions;
	}

	export type Action = ActionProcessor|AsyncActionProcessor|StateChunk;

	export interface Actions extends AR_Utils.Obj<Action>{}

	export interface ActionProcessor{
		( state:any
		, payload:any
		, meta:any
		, type:AR_Conf.SnakeCasedString
		):any;
		identifier?:string;
	}

	export interface AsyncActionProcessorMain{
		( state:any
		, payload:any
		, meta:any
		, actions:ActionDispatchers
		, dispatch:AR_Redux.Dispatch
		, type:AR_Conf.SnakeCasedString
		):any;
		identifier?:string;
	}

	export interface AsyncActionProcessor{
		_:AsyncActionProcessorMain;
		success?:ActionProcessor;
		error?:ActionProcessor;
		started?:ActionProcessor;
		cancelled?:ActionProcessor;
	}

	export interface ActionDispatchers{
		success:AR_Redux.ActionDispatcher;
		started:AR_Redux.ActionDispatcher;
		error:AR_Redux.ActionDispatcher;
		cancelled:AR_Redux.ActionDispatcher;
	}

}

declare namespace AR_Build{

	export interface ActionProcessors extends AR_Utils.Obj<AR_Conf.ActionProcessor>{}

	export interface Actions extends AR_Utils.Obj<AR_Redux.AnyActionCreator<any>>{}

	export interface ActionProcessorTuple<T> extends Array<any>{
		0:AR_Conf.ActionProcessor
		1:T
		2:Actions
	}

	export interface ActionReducersTuple extends Array<any>{
		0:AR_Redux.Reducer<any>
		1:any
		2:Actions
	}

}

declare namespace AR_Redux{

	export interface TypedAction<T>{
		type:AR_Conf.SnakeCasedString;
		error?:boolean;
		payload:T
		meta:any;
	}

	export interface Action extends TypedAction<any>{}

	export interface ErrorAction extends TypedAction<Error>{
		error:boolean;
	}

	export interface AnyActionCreator<T>{
		(payload:T,meta?:any,err?:boolean):T;
		start:AnyActionCreator<T>;
		type:AR_Conf.SnakeCasedString;
		identifier:string;
	}

	export interface ActionCreator extends AnyActionCreator<any>{}

	export interface AsyncActionCreator extends AnyActionCreator<AsyncAction<any>>{
		error:ActionCreator;
		success:ActionCreator;
		started:ActionCreator;
		cancelled:ActionCreator;
	}

	export interface Reducer<T>{
		(state:T,action:AR_Redux.Action):T
	}

	export interface Dispatch{
		(action:Action|AsyncAction<any>):any;
	}

	export interface GetState<T>{
		():T;
	}

	export interface AsyncAction<T>{
		(dispatch:Dispatch,getState:GetState<T>):Promise<any>
	}

	export interface ActionDispatcher{
		(payload:any,meta?:any,err?:boolean):any;
	}

}


declare namespace AR_Store{

	export interface StoreCreator<T>{
		(newId:number,payload:T,elements?:StoreObjecType<T>[]):StoreObjecType<T>;
	}

	export type StoreObjecType<T> = T & {id:number}

	export interface State<T>{
		ids:number[];
		byId:StoreObjecType<T>[];
	}

	export interface Edit<T>{
		(state:State<T>,id:number,fn:(el:any)=>any)
	}

	export interface ActionProcessor<T,P> extends AR_Conf.ActionProcessor{
		( state:State<T>
		, payload:P
		, meta?:any
		, type?:AR_Conf.SnakeCasedString
		):any;
	}

	export interface StoreElementEdit<T>{
		(state:State<T>,id:number,fn:(el:any)=>any)
	}

	export interface StoreGenerated<T>{
		state:State<T>;
		add:ActionProcessor<T,T>;
		addMany:ActionProcessor<T,T[]>;
		remove:ActionProcessor<T,number>;
		get:ActionProcessor<T,number>;
		update:ActionProcessor<T,any>;
		toggle:ActionProcessor<T,{id:number,prop:string}>;
	}

	export interface PostProcessor<T>{
		(store:StoreGenerated<T>,edit:StoreElementEdit<T>):any;
	}
}
interface ActionsReducerConf extends AR_Conf.Config{}

interface NodeModule{
	hot:{
		accept:any;
	}
}

interface Window{
	devToolsExtension:Function;
}

interface NodeRequireContext{
	(path:string):any;
	resolve(path:string):string;
	keys():string[];
}

interface NodeRequire{
	context(path:string,useSubdirectories?:boolean,regexp?:RegExp):NodeRequireContext;
}