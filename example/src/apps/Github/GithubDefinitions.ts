
import {MODE} from './data';

export interface GistsFetcherProps{
	name:string;
	mode:MODE;
	error?:Error;
	gists:{url:string,title:string}[]
}

export interface GistsFetcherActions{
	set:(name:string)=>any;
	get:()=>any;
}

export type GistsFetcherPropTypes = GistsFetcherProps & GistsFetcherActions;