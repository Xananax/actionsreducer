import * as React from 'react';
import pages from './pages';
import HTML from '../HTML';
import Wrapper from '../Wrapper';
import getPrism from '../../vendor/Prism';

getPrism('bash');

export interface PagePropTypes{
	params:{
		page:string;
	}
}

const getPage = (page:string):string => (
	(!page) ?
		pages['intro'] :
		(page in pages) ?
			pages[page] :
			pages['404']
)

const Page:React.StatelessComponent<PagePropTypes> = ({params:{page}}) => <Wrapper text={getPage(page)} name='page'/>

export default Page;