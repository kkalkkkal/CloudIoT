
// ------------------------------------------------------------------
// S3 Example code: Create a Objects
// ------------------------------------------------------------------

var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.region = 'ap-northeast-2';
AWS.config.apiVersions = {
    s3: '2006-03-01',
};
var s3 = new AWS.S3({
    "accessKeyId": "AKIAV7ANXPMGIEZBIJZ2",
    "secretAccessKey": "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"
});
//var s3 = new AWS.S3();

function createObject(params) {
    return new Promise(function (resolve, reject) {
        s3.upload(params, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        })
    });
}

var test = async function () {
    try {
        // 1st Object
        const co_params1 = {
            Bucket: "2021-kkalkkkal-s3-test",
            Key: 'image/index.zip',
            Body: fs.createReadStream("./index.zip")
        };
        var res2 = await createObject(co_params1);
        console.log(res2);
    } catch (err) {
        console.log('-- Error --');
        console.log(err);
    }
}

// run the test
test();
