export default function getByPath(path:string[],obj:any):any{
	if(!obj){return false;}
	const {length} = path;
	let i = 0;
	let curr = obj;
	while(i < length && curr){
		const part = path[i++];
		curr = curr[part];
	}
	return curr;
}