var AWS = require('aws-sdk');
AWS.config.update({
    region: "us-west-2"
})

let docClient = new AWS.DynamoDB.DocumentClient();

exports.lambdaHandler = async (event, context) => {
    var id = event.queryStringParameters.scryfallid;
    var name = event.queryStringParameters.name;
    
    var params = {
        TableName: "TestCardTable",
        Item: {
            "scryfallid" : id,
            "name" : name
        }       
    };

    return docClient.put(params).promise()
        .then((result) => {
            return { statusCode: 200, body: JSON.stringify(result) };
        }).catch(function(error) {
            return {    statusCode: 500,
                        error: 'Could not insert: ${error.stack}'
                    };
        });
};



