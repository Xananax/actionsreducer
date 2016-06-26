import * as React from 'react';

import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

const IS_BROWSER = (typeof window != 'undefined');
const HAS_DEVTOOLS_EXTENSION = IS_BROWSER && window.devToolsExtension;
const USE_DEVTOOLS_EXTENSION = HAS_DEVTOOLS_EXTENSION;

const DevTools = createDevTools(
	<DockMonitor 
		toggleVisibilityKey='ctrl-h'
		changePositionKey='ctrl-q'
		defaultIsVisible={true}
	>
		<LogMonitor theme='tomorrow' />
	</DockMonitor>
);


function enhance(){
	return (
		(IS_BROWSER && HAS_DEVTOOLS_EXTENSION && USE_DEVTOOLS_EXTENSION) ?
			window.devToolsExtension() : 
			DevTools.instrument()
	);
}



export 
	{ enhance
	, DevTools
	, IS_BROWSER
	, HAS_DEVTOOLS_EXTENSION
	, USE_DEVTOOLS_EXTENSION
	}