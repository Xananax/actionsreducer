import requireAll from '../../../../../src/utils/requireAll';
const readme = require('../../../../../readme.md');

const pages = requireAll( require.context('./', true, /\.md$/) );
const about = pages['about'];
delete pages['about'];

pages['readme'] = readme;
pages['about'] = about;

export default pages;