import requireAll from '../../../../../src/utils/requireAll';

const pages = requireAll( require.context('./', true, /\.md$/) );

export default pages;