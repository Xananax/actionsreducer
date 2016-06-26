import * as React from 'react';
import pages from './pages';

export interface PagePropTypes{
	page:string;
}

function getPage(page:string){
	if(!page){
		return {__html:pages['intro']}
	}
	if(!(page in pages)){
		return {__html:pages['notFound']};
	}
	return {__html:pages[page]};
}

const Page:React.StatelessComponent<PagePropTypes> = ({page}) => (
	<div>
		<div dangerouslySetInnerHTML={getPage(page)}/>
	</div>
)

export default Page;