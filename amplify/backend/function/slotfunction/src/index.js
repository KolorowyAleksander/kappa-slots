/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const uuid = require('uuid/v4');
const region = process.env.REGION;
const environment = process.env.ENV;
const tableName = `slotstable-${environment}`;

function dynamoWrite(username, data, context) {
  AWS.config.update({region: region});
  const client = new AWS.DynamoDB.DocumentClient();
  const now = new Date().toISOString();
  const item = {
    ...data,
    id: uuid(),
    user: username,
    date: now,
  }

  const params = {
    TableName: tableName,
    Item: item,
  };

  client.put(params, function(err, data) {
    if (err) {
      console.log(err);
      context.done('Error saving the result to the database', null);
    } else {
      context.done(null, item);
    }
  });
}

exports.handler = function (event, context) { //eslint-disable-line
  const username = event.identity.username;

  const win = getRandomInt(2);
  const possibleResults = ['mellon', 'warek', 'cherry', 'dollar'];

  const result = (win)
    ? {
      first: 'kappa',
      second: 'kappa',
      third: 'kappa',
      winner: true,
    }
    : {
      first: getRandomElement(possibleResults),
      second: getRandomElement(possibleResults),
      third: getRandomElement(possibleResults),
      winner: false,
    };

  dynamoWrite(username, result, context);
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}