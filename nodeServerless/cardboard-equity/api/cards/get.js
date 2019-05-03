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

var AWS = require('aws-sdk');
AWS.config.update({
    region: "us-west-2"
})

let docClient = new AWS.DynamoDB.DocumentClient();

exports.lambdaHandler = async (event, context) => {
    var id = event.queryStringParameters.scryfallid;
    var name = event.queryStringParameters.name;

    // console.log("id: " + id + ", type: " + typeof id + ". name: " + name + ", type: " + typeof name);
    console.log('id: ${id}, type: ${typeof id}. name: ${name}, type: ${typeof name}');
    
    var params = {
        TableName: "BulkMagicCards",
        Key: {
            'scryfallid' : id,
            'name' : name
        }      
    };

    // TODO: validate input I guess
    // if (!validate(event)) {
    //     return {
    //     statusCode: 400,
    //     error: `Expected input of the form...`
    //     };
    // }
    
    // return docClient.get({
    //     // put the whole payload inline
    // }).promise().then((data) => {
    //     return { statusCode: 200, body: JSON.stringify(data) };
    // }).catch(error) => {
    //     return {
    //     statusCode: 500,
    //     error: `Could not fetch: ${error.stack}`
    //     };
    // });

    try {
        const data = await docClient.get(params).promise();
        return { statusCode: 200, body: JSON.stringify(data) };
    } catch (error) {
        return {
            statusCode: 500,
            error: `Could not fetch: ${error.stack}`
        };
    }        
};




