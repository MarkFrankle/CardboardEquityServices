/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

let response;
var AWS = require('aws-sdk');
AWS.config.update({
    region: "us-west-2"
})

let docClient = new AWS.DynamoDB.DocumentClient();

exports.lambdaHandler = async (event, context) => {
    console.log("\n\n*********************\n");
    var id = event.queryStringParameters.scryfallid;
    var name = event.queryStringParameters.name;

    console.log('id: ${id}, type: ${typeof id}. name: ${name}, type: ${typeof name}');
    
    var params = {
        TableName: "TestCardTable",
        Item: {
            "scryfallid" : id,
            "name" : name
        }       
    };

    let putItem = new Promise((res, rej) => {
        docClient.put(params, function(err, data) {
            if (err) {
                console.log("Error", err);
                rej(err);
            } else {
                console.log("Success", data);
                res("Insert data completed");
            }
        }); 
    });

    const result = await putItem;
    console.log(result);    
    console.log("\n\n*********************\n");
    return result;    
};



