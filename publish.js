require('dotenv').config({ path: '../../.env' })

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');
const packageJSONPath = `${path.resolve()}/package.json`;
const packageJSON = require(packageJSONPath);

const lambdaName = packageJSON.name


// Load credentials and set region from JSON file
const {
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
  AWS_REGION,
} = process.env;

// Create the IAM service object
const lambda = new AWS.Lambda({
  apiVersion: '2015-03-31',
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: AWS_REGION,
});

const zipPath = `${path.resolve()}/dist/archive.zip`;

console.log('zipPath', path)

// var params = {
//   Code: {
//     ZipFile: fs.readFileSync(zipPath)
//   },
//   Description: "testing",
//   FunctionName: lambdaName,
//   Handler: "index.handler", // is of the form of the name of your source file and then name of your function handler
//   MemorySize: 128,
//   Publish: true,
//   Role: "arn:aws:iam::764074376504:role/lambda-full-access", // replace with the actual arn of the execution role you created
//   Runtime: "nodejs10.x",
//   Timeout: 15,
//  };

const params = {
  FunctionName: lambdaName, /* required */
  ZipFile: fs.readFileSync(zipPath),
  Publish: false,
}

// const promise = lambda.createFunction(params).promise()
const promise = lambda.updateFunctionCode(params).promise()

promise.then((res) => {
  console.log(res)
}).catch(err => console.log(err))


