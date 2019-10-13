/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */


const AWS = require('aws-sdk');
const region = process.env.REGION;
const environment = process.env.ENV;
const tableName = `slotstable-${environment}`;


function getAllEntries(user, context) {
  AWS.config.update({region: region});
  const client = new AWS.DynamoDB.DocumentClient();

  const query = {
    TableName: tableName,
    FilterExpression: '#user = :user',
    ExpressionAttributeNames:{ "#user": "user" },
    ExpressionAttributeValues: { ':user': user },
  };

  client.scan(query, function(err, data) {
    if (err) {
      console.log(err);
      context.done('Something went wrong when scanning for history', null);
    } else {
      console.log(data);
      context.done(null, { entries: data.Items });
    }
  });
}

exports.handler = function (event, context) { //eslint-disable-line
  const username = event.identity.username;
  getAllEntries(username, context);
};