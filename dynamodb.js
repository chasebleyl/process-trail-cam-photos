const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

function write(table, data) {
	const params = {
		TableName: table,
		Item: {
			"camera": data.camera, 
			"datetime": data.date + 'T' + data.time,
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
