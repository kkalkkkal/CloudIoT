
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

function listObjects(params) {
    return new Promise(function (resolve, reject) {
        s3.listObjects(params, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

var test = async function () {
    try {
        var cb_params = {
            Bucket: "cws-lab-s3-v2",
        };
        console.log('-- List the Objects in the Bucket --');
        var res4 = await listObjects(cb_params);
        console.log(res4);
    } catch (err) {
        console.log('-- Error --');
        console.log(err);
    }
}

// run the test
test();
