

// ------------------------------------------------------------------
// S3 Example code: Create a Bucket
// ------------------------------------------------------------------

var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.region = 'ap-northeast-2';
AWS.config.apiVersions = {
    s3: '2006-03-01',
};
// var s3 = new AWS.S3({ 
//     "accessKeyId": "...",
//     "secretAccessKey": "..."
// });
var s3 = new AWS.S3();

// Bucket Creation Function
function createBucket(params) {
    return new Promise(function (resolve, reject) {
        s3.createBucket(params, function (err, data) {
            if (err) reject(err); // an error occurred
            else resolve(data);
        });
    });
}

var test = async function () {
    try {
        console.log('-- Create Bucket --');
        // Bucket Creation Request Parameters
        var cb_params = {
            Bucket: "cws-lab-s3-v2",
        };
        var res1 = await createBucket(cb_params);
        console.log(res1);
    } catch (err) {
        console.log('-- Error --');
        console.log(err);
    }
}

// run the test
test();