'use strict';

class Extractor {
	constructor(temperature, date, time, camera, text) {
		this.data = {
			temperature: temperature,
			date: date,
			time: time,
			camera: camera,
			detectedText: text
		}
	}
	
	static processResponse(response) {
		this.data = {}
		response.forEach((item) => {
			if (this.stringGreaterThan25(item.DetectedText)) {
				this.data.detectedText = item.DetectedText;
				const components = this.data.detectedText.split(" ");
				components.forEach((component) => {
					if (this.isTemperature(component)) {
						
					}
				});
			}
		});
		
		return this.data.detectedText;
	}
	
	static stringGreaterThan25(string) {
		if (string.length >= 25) {
			return true;
		} else {
			return false;
		}
	}
	
	static isTemperature(candidate) {
		if (candidate.indexOf('F') < 0) {
			return false;
		}
		const strippedString = candidate.replace("'", "").replace("F", "");
		if (this.isNumeric(strippedString) && this.isTempLength(strippedString)) {
			return true;
		} else {
			return false;
		}
		
	}
	
	static isNumeric(number) {
		return !isNaN(number);
	}
	
	static isTempLength(candidate) {
		if (candidate.length > 3) {
			return false;
		} else {
			return true;
		}
	}
}

module.exports = Extractor;

// "41'F O 0910812017 05 44AM CAMERA1"
// "41'F O 09/10812017 05 49AM CAMERA1"
// "D 23'F D 0912612017 7: 30AM TROUGH1"
// "41'F O 09/10812017 05 49AM CAMERA1"
// "D 23'F D 0912612017 7: 30AM TROUGH1"