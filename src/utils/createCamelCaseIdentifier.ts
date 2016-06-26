import strCapitalizeFirst from './strCapitalizeFirst';

export default function createCamelCaseIdentifier(parentIdentifier:string,identifier:string){
	if(parentIdentifier && identifier){
		return `${parentIdentifier}${strCapitalizeFirst(identifier)}`;
	}
	return identifier
}