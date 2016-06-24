import {Promise} from 'es6-promise';

function fakeResponse(response:string){
	return (
		{ json:()=>({data:response})
		}
	);
} 

export default function fakeFetch(str):PromiseLike<{json():Object}>{
	return new Promise(function(resolve,reject){
		setTimeout(function() {
			if(str=='error'){
				return reject(new Error('wrong parameters'));
			}
			return resolve(fakeResponse(str));
		}, 300);
	})
}