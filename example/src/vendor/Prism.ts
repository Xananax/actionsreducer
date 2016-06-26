import * as Prism from 'prismjs';

export default function(language:string='',theme:string=''){
	language && require(`prismjs/components/prism-${language}`);
	theme && require(`prismjs/themes/prism-${theme}.css`);
	return Prism;
}