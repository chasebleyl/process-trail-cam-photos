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
				for (let i = 0; i < components.length; i++) {
					if (this.isTemperature(components[i])) {
						this.data.temperature = this.getTemperature(components[i]);
					} else if (this.isDate(components[i])) {
						this.data.date = this.getDate(components[i]);
					} else if (i < components.length - 1 && this.isTime(components[i], components[i + 1])) {
						this.data.time = this.getTime(components[i], components[i+1]);
						i++;
					} else if (this.isCamera(components[i])) {
						this.data.camera = components[i];
					}
				}
			}
		});
		if (!this.data.time) {
			this.data.time = null;
		}
		return this.data;
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
	
	static getTemperature(tempString) {
		return Number(tempString.replace("'", "").replace("F", ""));
	}
	
	static isDate(candidate) {
		if (candidate.length < 8) {
			return false;
		}
		const strippedString = candidate.replace("/", "");
		if (this.isNumeric(strippedString)) {
			return true;
		}
		return false;
	}

	static getDate(dateString) {
		let date = {};
		date.month = dateString.slice(0, 2);
		date.year = dateString.slice(-4);
		date.day = this.extractDay(dateString.slice(2, -4));
		return date.year + '-' + date.month + '-' + date.day;
	}
	
	static isTime(candidateOne, candidateTwo) {
		const hour = candidateOne.replace('0', '').replace(':', '');
		const minutes = candidateTwo.slice(0 ,-2);
		const period = candidateTwo.slice(-2);
		if (isNaN(hour)) {
			return false;
		}
		if (isNaN(minutes)) {
			return false;
		}
		if (period !== 'AM' && period !== 'PM') {
			return false;
		}
		return true;
	}
	
	static getTime(candidateOne, candidateTwo) {
		let hour = candidateOne.replace('0', '').replace(':', '');
		const minutes = candidateTwo.slice(0 ,-2);
		const period = candidateTwo.slice(-2);
		let time = '';
		
		if (period === 'AM') {
			if (hour.length < 2) {
				hour = '0' + hour;
			} else if (hour == '12') {
				hour = '00';
			}
		} else {
			if (hour !== '12') {
				hour = (12 + Number(hour)).toString();
			}
		}
		return hour + ':' + minutes + ':00';
	}
	
	static isCamera(candidate) {
		if (candidate.length < 5) {
			return false;
		}
		if (this.isNumeric(candidate)) {
			return false;
		}
		return true;
	}
	
	static extractDay(string) {
		let newString = string.slice(1, -1);
		if (newString.length === 2) {
			return newString;
		} else if (newString.length === 3) {
			return newString.slice(1);
		} else {
			return RangeError('Day string is too long to be extracted properly');
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
	
	static stringGreaterThan25(string) {
		if (string.length >= 25) {
			return true;
		} else {
			return false;
		}
	}
}

module.exports = Extractor;

// "41'F O 0910812017 05 44AM CAMERA1"
// "41'F O 09/10812017 05 49AM CAMERA1"
// "D 23'F D 0912612017 7: 30AM TROUGH1"
// "41'F O 09/10812017 05 49AM CAMERA1"
// "D 23'F D 0912612017 7: 30AM TROUGH1"