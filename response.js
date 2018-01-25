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
            } else {
                console.log("Shorter");
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
}

module.exports = Extractor;

// "41'F O 0910812017 05 44AM CAMERA1"
// "41'F O 09/10812017 05 49AM CAMERA1"
// "D 23'F D 0912612017 7: 30AM TROUGH1"
// "41'F O 09/10812017 05 49AM CAMERA1"
// "D 23'F D 0912612017 7: 30AM TROUGH1"