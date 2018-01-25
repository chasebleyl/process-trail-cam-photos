'use strict';

const ImageProcessor = require('./process.js');

module.exports.process = (event, context, callback) => {
	event.Records.forEach((record) => {
		const s3Config = {
			bucket: record.s3.bucket.name,
			imageName: record.s3.object.key
		};
		
		let labelPromise = ImageProcessor.getImageLabels(s3Config).catch((error) => {
			console.log(error.message || 'Internal server error')
		});
		
		let textPromise = ImageProcessor.getImageText(s3Config).catch((error) => {
			console.log(error.message || 'Internal server error')	
		});
		
		Promise.all([labelPromise, textPromise]).then((values) => {
			const labels = values[0];
			const text = values[1];
			console.log("All promises have finished.");
			console.log(JSON.stringify(text));
		});
	});
	
	callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
