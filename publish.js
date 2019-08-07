require('dotenv').config({ path: '../../.env' })

console.log('asdbhjasbdhjasbdjahsbdjhsa')
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');

const asd = async () => {
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

  try {
    const asd = await lambda.getFunction({
      FunctionName: lambdaName,
    }).promise();

    const asd2 = await lambda.updateFunctionCode({
      FunctionName: lambdaName,
      ZipFile: fs.readFileSync(zipPath),
      Publish: false,
    }).promise()
    console.log(asd2)
  } catch(error) {
    if (error.code === 'ResourceNotFoundException') {
    const createFunctionParams = {
      Code: {
        ZipFile: fs.readFileSync(zipPath)
      },
      FunctionName: lambdaName,
      Handler: "index.handler", // is of the form of the name of your source file and then name of your function handler
      MemorySize: 128,
      Publish: true,
      Role: "arn:aws:iam::764074376504:role/lambda-full-access", // replace with the actual arn of the execution role you created
      Runtime: "nodejs10.x",
      Timeout: 15,
    };
    }
      // // const promise = lambda.createFunction(params).promise()

    console.log({ error})
  }

  // var params = {
  //   Code: {
  //     ZipFile: fs.readFileSync(zipPath)
  //   },
  //   FunctionName: lambdaName,
  //   Handler: "index.handler", // is of the form of the name of your source file and then name of your function handler
  //   MemorySize: 128,
  //   Publish: true,
  //   Role: "arn:aws:iam::764074376504:role/lambda-full-access", // replace with the actual arn of the execution role you created
  //   Runtime: "nodejs10.x",
  //   Timeout: 15,
  //  };

  // promise.then((res) => {
  //   console.log(res)
  // }).catch(err => console.log(err))
}

asd()



