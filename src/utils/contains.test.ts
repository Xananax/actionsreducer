import contains from './contains';
import {expect} from 'chai';

describe(`contains`,()=>{
	describe(`contains([])`,()=>{
		it(`should return 'false'`,()=>{
			expect(contains([])).to.equal(false);
		});
	});
	describe(`contains([])`,()=>{
		it(`should return 'true' if the array contains the element`,()=>{
			expect(contains(['a','b','c'],'b')).to.equal(true);
		});
		it(`should return 'false' if the array does not contain the element`,()=>{
			expect(contains(['a','b','c'],'d')).to.equal(false);
		})
	})
})