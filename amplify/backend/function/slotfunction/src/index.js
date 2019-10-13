/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */

exports.handler = function (event, context) { //eslint-disable-line
  console.log(`value1 = ${event.user}`);

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

  context.done(null, result);
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}