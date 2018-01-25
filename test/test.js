const assert = require('assert');
const responseExtractor = require('../response.js');
const responseOne = require('./data/response-1.json');

describe('Text Response Extraction', () => {
   describe('Get Test Data', () => {
		it("Response-1: DetectedText should match 41'F O 0910812017 05 44AM CAMERA1", () => {
			assert.equal(responseExtractor.processResponse(responseOne), "41'F O 0910812017 05 44AM CAMERA1");
		});
		
		it('String should be less than 25', () => {
		    assert.equal(responseExtractor.stringGreaterThan25('1'), false);
		});
		it('String should be more than 25', () => {
		    assert.equal(responseExtractor.stringGreaterThan25('12345678901234567890123456'), true);
		});
		it('String should equal 25', () => {
		    assert.equal(responseExtractor.stringGreaterThan25('1234567890123456789012345'), true);
		});
   });
});