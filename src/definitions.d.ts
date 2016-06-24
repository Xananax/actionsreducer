
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
		, payload:AR_Redux.Payload<any>
		, meta:AR_Redux.Meta
		, type:AR_Conf.SnakeCasedString
		):any;
		identifier:string;
	}

	export interface AsyncActionProcessorMain{
		( state:any
		, payload:AR_Redux.Payload<any>
		, meta:AR_Redux.Meta
		, actions:ActionDispatchers
		, dispatch:AR_Redux.Dispatch
		, type:AR_Conf.SnakeCasedString
		):any;
		identifier:string;
	}

	export interface AsyncActionProcessor{
		_:AsyncActionProcessorMain;
		success?:ActionProcessor;
		error?:ActionProcessor;
		started?:ActionProcessor;
	}

	export interface ActionDispatchers{
		success:AR_Redux.ActionDispatcher<AR_Redux.Action>;
		started:AR_Redux.ActionDispatcher<AR_Redux.Action>;
		error:AR_Redux.ActionDispatcher<Promise<Error>>;
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

	export interface Payload<T> extends Object{}
	export interface Meta extends Object{}

	export interface TypedAction<T>{
		type:AR_Conf.SnakeCasedString;
		error?:boolean;
		payload:Payload<T>
		meta:Meta;
	}

	export interface Action extends TypedAction<any>{}

	export interface ErrorAction extends TypedAction<Error>{
		error:boolean;
	}

	export interface AnyActionCreator<T>{
		(payload:Payload<T>,meta?:Meta,err?:boolean):T;
		start:AnyActionCreator<T>;
		type:AR_Conf.SnakeCasedString;
		identifier:string;
	}

	export interface ActionCreator extends AnyActionCreator<Action>{}

	export interface AsyncActionCreator extends AnyActionCreator<AsyncAction<any>>{
		error:ActionCreator;
		success:ActionCreator;
		started:ActionCreator;
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

	export interface ActionDispatcher<T>{
		(payload:Payload<T>,meta?:Meta,err?:boolean):T;
	}

}