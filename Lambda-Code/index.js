/* lambda Code */

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

function createObject(params) {
    return new Promise(function (resolve, reject) {
        s3.upload(params, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        })
    });
}


exports.handler = async (event) => {

     const co_params1 = {
             Bucket: "2021-kkalkkkal-s3-test",
             Key:'image/pmd_logo.png',
             Body: fs.createReadStream("./pmd_logo.png")
         };

    createObject(co_params1);

    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify(event),
    };
    return response;
};
