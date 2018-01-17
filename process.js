'use strict';

const AWS = require('aws-sdk');

const rek = new AWS.Rekognition();

class ImageProcessor {
	
	static getImageLabels(s3Config) {
		
		const params = {
			Image: {
				S3Object: {
					Bucket: s3Config.bucket,
					Name: s3Config.imageName,
				},
			},
			MaxLabels: 10,
			MinConfidence: 50,
		};
		
		console.log(`Processing file for labels: https://s3.amazonaws.com/${s3Config.bucket}/${s3Config.imageName}`);
		
		return new Promise((resolve, reject) => {
			rek.detectLabels(params, (err, data) => {
				if (err) {
					console.log(err)
					reject(new Error(err));
				}
				resolve(data.Labels);
			});
		});
		
	}
	
	static getImageText(s3Config) {
		
		const params = {
			Image: {
				S3Object: {
					Bucket: s3Config.bucket,
					Name: s3Config.imageName,
				},
			}
		};
		
		console.log(`Processing file for text: https://s3.amazonaws.com/${s3Config.bucket}/${s3Config.imageName}`);
		
		return new Promise((resolve, reject) => {
			rek.detectText(params, (err, data) => {
				if (err) {
					console.log(err)
					reject(new Error(err));
				}
				resolve(data.TextDetections);
			});
		});
		
	}
	
}

module.exports = ImageProcessor;