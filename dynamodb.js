const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();


module.exports.write = (data) => {
	const params = {
		TableName: process.env.table,
		Item: {
			"imageName": data.imageName,
			"date": data.date,
			"camera": data.camera,
			"temperature": data.temperature,
			"date": data.date,
			"time": data.time,
			"camera": data.camera,
			"detectedText": data.detectedText,
			"labels": data.labels
		}
	};
	
	dynamodb.put(params, (err, data) => {
		if (err) console.error(err, err.stack); // an error occurred
		else     return data;             // successful response
	});	
}
