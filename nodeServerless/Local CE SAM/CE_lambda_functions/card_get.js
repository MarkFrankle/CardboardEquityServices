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
// let ddb = new AWS.DynamoDB();

exports.lambdaHandler = async (event, context) => {
    try {
        console.log("\n\n*********************\n");
        var id = event.queryStringParameters.scryfallid;
        var name = event.queryStringParameters.name;

        console.log("id: " + id + ", type: " + typeof id + ". name: " + name + ", type: " + typeof name);
        
        var params = {
            TableName: "BulkMagicCards",
            Key: {
                'scryfallid' : id,
                'name' : name
            }      
        };

        try {
            const data = await docClient.get(params).promise();
            return { statusCode: 200, body: JSON.stringify(data) };
        } catch (error) {
            return {
              statusCode: 400,
              error: `Could not fetch: ${error.stack}`
            };
        }        
    } catch (err) {
        console.log(err);
        return err;
    }
    
};

// return response
// response = {
//     'statusCode': 200,
//     'body': JSON.stringify({
//         message: id,
//         // location: ret.data.trim()
//     })
// }