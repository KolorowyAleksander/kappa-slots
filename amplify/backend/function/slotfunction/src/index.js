/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const util = require('util');
const uuid = require('uuid/v4');
const region = process.env.REGION;
const environment = process.env.ENV;
const tableName = `slotstable-${environment}`;

function dynamoWrite(data) {
  AWS.config.update({region: region});
  const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  const item = {
    ...data,
    id: uuid(),
    
  }
  const params = {
    TableName: tableName,
    Item: AWS.DynamoDB.Converter.input(item),
  };

  ddb.putItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
}

exports.handler = function (event, context) { //eslint-disable-line
  console.log(`value1 = ${event}`);

  const win = getRandomInt(1);
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

  // dynamoWrite(result);

  context.done(null, result);
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}