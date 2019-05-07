const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-west-2',
});

const docClient = new AWS.DynamoDB.DocumentClient();

function validate(event) {
  // TODO: Figure out my event format so I can validate it
  return true;
}

exports.lambdaHandler = async (event, context) => {
  const id = event.queryStringParameters.scryfallid;
  const { name } = event.queryStringParameters;

  const params = {
    TableName: 'BulkMagicCards',
    Key: {
      scryfallid: id,
      name,
    },
  };

  if (!validate(event)) {
    return {
      statusCode: 400,
      error: 'Expected input of the form {}',
    };
  }

  // TODO: If the item is not in the db, this returns 200 and empty body. Is that a problem?
  //       Should I handle a database miss on the receiving side?
  return docClient.get(params).promise()
    .then(data => ({ statusCode: 200, body: JSON.stringify(data) }))
    .catch(error => ({
      statusCode: 500,
      error: `Could not fetch: ${error.stack}`,
    }));
};

// Sample Data:
//   "name": "Hour of Eternity",
//   "scryfallid": "01040ed3-4f64-4e47-8f80-3d3a339004f7"
