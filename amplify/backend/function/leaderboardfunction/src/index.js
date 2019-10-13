/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const region = process.env.REGION;
const environment = process.env.ENV;
const tableName = `slotstable-${environment}`;


const itemPoints = {
  'cherry': 10,
  'dollar': 15,
  'mellon': 20,
  'warek': 25,
  'kappa': 50,
};


function countPoints(userData) {
  return userData
    .reduce(
      (p, c) => p 
        + itemPoints[c.first]
        + itemPoints[c.second]
        + itemPoints[c.third]
        + 50 * c.winner,
      0
    );
}

function countWins(userData) {
  return userData.reduce((p, c) => p + c.winner, 0);
}


function sortByPoints(arrayData) {
  const sortedArrayData = arrayData.sort((a, b) => a.score - b.score);
  return [...sortedArrayData];
}

function appendArtificialScores(sortedData) {
  return [
    ...ordered,
    {
      user: "Kappa",
      wins: "6969",
      score: "9001",
    },
    {
      user: "Xylophonepiano",
      wins: "2",
      score: "5",
    },
    {
      user: "Sadclaps",
      wins: "0",
      score: "0",
    },   
  ];
}

function groupData(data, context) {
  const grouped = data.reduce((previous, current) =>
      (current.user in previous)
        ? { ...previous, [current.user]: [...previous[current.user], current] }
        : { ...previous, [current.user]: [current] },
      {});

  const counted = Object
    .entries(grouped)
    .map(([username, data]) => ({
      user: username,
      score: countPoints(data),
      wins: countWins(data),
    }));

  const sorted = sortByPoints(counted);

  const sorted2 = appendArtificialScores(sorted);

  const ordered = sorted2.map((value, index) => ({...value, place: index++ }));

  context.done(null, { entries: ordered });
}


function getAllEntries(context) {
  AWS.config.update({region: region});
  const client = new AWS.DynamoDB.DocumentClient();

  const query = { TableName: tableName };

  client.scan(query, function(err, data) {
    if (err) {
      console.log(err);
      context.done('Something went wrong when scanning for leaderboard', null);
    } else {
      groupData(data.Items, context);
    }
  });
}

exports.handler = function (_, context) { //eslint-disable-line
  getAllEntries(context);
};
