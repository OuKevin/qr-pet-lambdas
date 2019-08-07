require('dotenv').config({ path: '../../.env' })

const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');

(async () => {
  const packageJSONPath = `${path.resolve()}/package.json`;
  const packageJSON = require(packageJSONPath);
  const lambdaName = packageJSON.name

  const {
    AWS_ACCESS_KEY,
    AWS_SECRET_KEY,
    AWS_REGION,
  } = process.env;

  const lambda = new AWS.Lambda({
    apiVersion: '2015-03-31',
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: AWS_REGION,
  });

  const zipPath = `${path.resolve()}/dist/archive.zip`;

  try {
    await lambda.getFunction({
      FunctionName: lambdaName,
    }).promise();

    await lambda.updateFunctionCode({
      FunctionName: lambdaName,
      ZipFile: fs.readFileSync(zipPath),
      Publish: false,
    }).promise()
    } catch(error) {
      console.log(error.code)
      if (error.code === 'ResourceNotFoundException') {
      await lambda.createFunction({
        Code: {
          ZipFile: fs.readFileSync(zipPath)
        },
        FunctionName: lambdaName,
        Handler: "index.handler",
        MemorySize: 128,
        Publish: true,
        Role: "arn:aws:iam::764074376504:role/lambda-full-access",
        Runtime: "nodejs10.x",
        Timeout: 15,
      }).promise()
    }
  }
})();



