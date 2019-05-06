var AWS = require('aws-sdk');
AWS.config.update({
    region: "us-west-2"
})

let docClient = new AWS.DynamoDB.DocumentClient();

exports.lambdaHandler = async (event, context) => {
    var id = event.queryStringParameters.scryfallid;
    var name = event.queryStringParameters.name;
    
    var params = {
        TableName: "BulkMagicCards",
        Key: {
            'scryfallid' : id,
            'name' : name
        }      
    };

    if (!validate(event)) {
        return {
            statusCode: 400,
            error: `Expected input of the form {}`
        };
    }

    return docClient.get(params).promise()
        .then((data) => {
            // TODO: If the item is not in the db, this returns 200 and empty body. Is that a problem?
            //       Should I handle a database miss on the receiving side?
            return { statusCode: 200, body: JSON.stringify(data) };
        }).catch(function(error) {
            return {    statusCode: 500,
                        error: 'Could not fetch: ${error.stack}'
                    };
        });
};

function validate(event) {
    // TODO: Figure out my event format so I can validate it
    return true;
}

// Sample Data:
//   "name": "Hour of Eternity",
//   "scryfallid": "01040ed3-4f64-4e47-8f80-3d3a339004f7"



