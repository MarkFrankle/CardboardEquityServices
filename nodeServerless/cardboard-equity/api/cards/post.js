const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-west-2',
});

const docClient = new AWS.DynamoDB.DocumentClient();

exports.lambdaHandler = async (event, context) => {
  const id = event.queryStringParameters.scryfallid;
  const { name } = event.queryStringParameters;

  const params = {
    TableName: 'TestCardTable',
    Item: {
      scryfallid: id,
      name,
    },
  };

  return docClient.put(params).promise()
    .then(result => ({ statusCode: 200, body: JSON.stringify(result) }))
    .catch(error => ({
      statusCode: 500,
      error: `Could not insert: ${error.stack}`,
    }));
};
