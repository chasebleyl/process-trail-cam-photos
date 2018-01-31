const assert = require('assert');
const responseExtractor = require('../response.js');
const responseOne = require('./data/response-1.json');
const responseTwo = require('./data/response-2.json');
const responseThree = require('./data/response-3.json');
const responseFour = require('./data/response-4.json');
const responseFive = require('./data/response-5.json');

describe('Text Response Extraction', () => {
   describe('Get Test Data', () => {
		it("Response-1: DetectedText should match 41'F O 0910812017 05 44AM CAMERA1", () => {
			const data = responseExtractor.processResponse(responseOne);
			assert.equal(data.detectedText, "41'F O 0910812017 05 44AM CAMERA1");
		});
		
		/* *** TEMPERATURE *** */
		
		it("Response-1: Temperature should match 41", () => {
			const data = responseExtractor.processResponse(responseOne);
			assert.equal(data.temperature, 41);
		});
		
		it("Response-2: Temperature should match 41", () => {
			const data = responseExtractor.processResponse(responseTwo);
			assert.equal(data.temperature, 41);
		});
		
		it("Response-3: Temperature should match 23", () => {
			const data = responseExtractor.processResponse(responseThree);
			assert.equal(data.temperature, 23);
		});
		
		it("Response-4: Temperature should match 41", () => {
			const data = responseExtractor.processResponse(responseFour);
			assert.equal(data.temperature, 41);
		});
		
		it("Response-5: Temperature should match 23", () => {
			const data = responseExtractor.processResponse(responseFive);
			assert.equal(data.temperature, 23);
		});
		
		it("Should be valid temperature", () => {
			assert.equal(responseExtractor.isTemperature("41'F"), true);
		});
		
		it("Should be valid temperature", () => {
			assert.equal(responseExtractor.isTemperature("23'F"), true);	
		});
		
		it("Should be valid temperature", () => {
			assert.equal(responseExtractor.isTemperature("-23'F"), true);	
		});
		
		it("Should not be valid temperature", () => {
			assert.equal(responseExtractor.isTemperature("D"), false);
		});
		
		it("Should not be valid temperature", () => {
			assert.equal(responseExtractor.isTemperature("|"), false);
		});
		
		it("Should not be valid temperature", () => {
			assert.equal(responseExtractor.isTemperature("0910812F17"), false);
		});
		
		it("Should return a numeric temperature", () => {
			assert.equal(responseExtractor.getTemperature("41'F"), 41);
		});
		
		it("Should return a numeric temperature", () => {
			assert.equal(responseExtractor.getTemperature("23'F"), 23);
		});
		
		it("Should return a numeric temperature", () => {
			assert.equal(responseExtractor.getTemperature("-23'F"), -23);
		});
		
		/* *** DATE *** */
		
		it("Response-1: Date should match 2017-09-08", () => {
			const data = responseExtractor.processResponse(responseOne);
			assert.equal(data.date, '2017-09-08');
		});
		
		it("Response-2: Date should match 2017-09-08", () => {
			const data = responseExtractor.processResponse(responseTwo);
			assert.equal(data.date, '2017-09-08');
		});
		
		it("Response-3: Date should match 2017-09-26", () => {
			const data = responseExtractor.processResponse(responseThree);
			assert.equal(data.date, '2017-09-26');
		});
		
		it("Response-4: Date should match 2017-09-08", () => {
			const data = responseExtractor.processResponse(responseFour);
			assert.equal(data.date, '2017-09-08');
		});
		
		it("Response-5: Date should match 2017-09-26", () => {
			const data = responseExtractor.processResponse(responseFive);
			assert.equal(data.date, '2017-09-26');
		});
		
		it("Should be valid date", () => {
			assert.equal(responseExtractor.isDate('0910812017'), true);
		});
		
		it("Should be valid date", () => {
			assert.equal(responseExtractor.isDate('09/10812017'), true);
		});
		
		it("Should be valid date", () => {
			assert.equal(responseExtractor.isDate('0912612017'), true);
		});
		
		it("Should return date", () => {
			assert.equal(responseExtractor.getDate('0910812017'), '2017-09-08');
		});
		
		it("Should return date", () => {
			assert.equal(responseExtractor.getDate('09/10812017'), '2017-09-08');
		});
		
		it("Should return date", () => {
			assert.equal(responseExtractor.getDate('0912612017'), '2017-09-26');
		});
		
		it("Should extract day from string", () => {
			assert.equal(responseExtractor.extractDay('1081'), '08');
		});
		
		it("Should extract day from string", () => {
			assert.equal(responseExtractor.extractDay('/1081'), '08');
		});
		
		it("Should extract day from string", () => {
			assert.equal(responseExtractor.extractDay('1261'), '26');
		});
		
		it("Should extract day from string", () => {
			assert.equal(responseExtractor.extractDay('/1081'), '08');
		});
		
		/* *** TIME *** */
		
		it("Response-1: Time should match 05:44:00", () => {
			const data = responseExtractor.processResponse(responseOne);
			assert.equal(data.time, '05:44:00');
		});
		
		it("Response-2: Time should match 05:49:00", () => {
			const data = responseExtractor.processResponse(responseTwo);
			assert.equal(data.time, '05:49:00');
		});
		
		it("Response-3: Time should match 07:30:00", () => {
			const data = responseExtractor.processResponse(responseThree);
			assert.equal(data.time, '07:30:00');
		});
		
		it("Response-4: Time should match 05:49:00", () => {
			const data = responseExtractor.processResponse(responseFour);
			assert.equal(data.time, '05:49:00');
		});
		
		it("Response-5: Time should match 07:30:00", () => {
			const data = responseExtractor.processResponse(responseFive);
			assert.equal(data.time, '07:30:00');
		});
		
		it("Should be valid time", () => {
			assert.equal(responseExtractor.isTime('05', '44AM'), true);
		});
		
		it("Should be valid time", () => {
			assert.equal(responseExtractor.isTime('05', '49AM'), true);
		});
		
		it("Should be valid time", () => {
			assert.equal(responseExtractor.isTime('7:', '30AM'), true);
		});
		
		it("Should return time", () => {
			assert.equal(responseExtractor.getTime('05', '44AM'), '05:44:00');
		});
		
		it("Should return time", () => {
			assert.equal(responseExtractor.getTime('05', '49AM'), '05:49:00');
		});
		
		it("Should return time", () => {
			assert.equal(responseExtractor.getTime('7:', '30AM'), '07:30:00');
		});
		
		it("Should return time", () => {
			assert.equal(responseExtractor.getTime('7:', '30PM'), '19:30:00');
		});
		
		it("Should return time", () => {
			assert.equal(responseExtractor.getTime('12', '15PM'), '12:15:00');
		});
		
		it("Should return time", () => {
			assert.equal(responseExtractor.getTime('11', '15PM'), '23:15:00');
		});
		
		it("Should return time", () => {
			assert.equal(responseExtractor.getTime('12', '03AM'), '00:03:00');
		});
		
		/* *** Camera *** */
		
		it("Response-1: Camera should match CAMERA1", () => {
			const data = responseExtractor.processResponse(responseOne);
			assert.equal(data.camera, 'CAMERA1');
		});
		
		it("Response-2: Camera should match CAMERA1", () => {
			const data = responseExtractor.processResponse(responseTwo);
			assert.equal(data.camera, 'CAMERA1');
		});
		
		it("Response-3: Camera should match TROUGH1", () => {
			const data = responseExtractor.processResponse(responseThree);
			assert.equal(data.camera, 'TROUGH1');
		});
		
		it("Response-4: Camera should match CAMERA1", () => {
			const data = responseExtractor.processResponse(responseFour);
			assert.equal(data.camera, 'CAMERA1');
		});
		
		it("Response-5: Camera should match TROUGH1", () => {
			const data = responseExtractor.processResponse(responseFive);
			assert.equal(data.camera, 'TROUGH1');
		});
		
		it("Should be valid camera", () => {
			assert.equal(responseExtractor.isCamera('CAMERA1'), true);
		});
		
		it("Should be valid camera", () => {
			assert.equal(responseExtractor.isCamera('TROUGH1'), true);
		});
		
		it("Should not be valid camera", () => {
			assert.equal(responseExtractor.isCamera('D'), false);
		});
		
		it("Should be a number", () => {
			assert.equal(responseExtractor.isNumeric("23"), true);	
		});
		
		it("Should not be a number", () => {
			assert.equal(responseExtractor.isNumeric("a23"), false);	
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