

/*Lambda Invoke Code*/

var AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';
var lambda = new AWS.Lambda ( {
  "apiVersion" : '2015-03-31',
  "accessKeyId": "AKIAV7ANXPMGIEZBIJZ2",
  "secretAccessKey": "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"
} );

const exp = { "Bucket" : "2021-kkalkkkal-s3-test", "Key" : "image/pmd_logo.png" };

var params = {
  FunctionName : "index", // or Function ARN
  // the other options: Event or DryRun
  InvocationType : "RequestResponse",
  Payload : JSON.stringify(exp)
};

lambda.invoke(params, function (err, data) {
  if(err) console.log(err);
  else console.log(JSON.parse(data.Payload));
});
