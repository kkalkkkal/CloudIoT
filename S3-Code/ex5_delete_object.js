

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

// Object Deletion 
function deleteObject(params) {
    return new Promise(function(resolve, reject) {
        s3.deleteObject(params, function (err, data) {
            if(err) reject(err);
            else resolve(data);
        });
    });
}

var test = async function () {
    try {
        console.log('-- Delete an Object from the Bucket --');
        const do_params = {
            Bucket: "cws-lab-s3-v2",
            Key: 'images/lunmeikwai.jpg',
        };
        var res6 = await deleteObject(do_params);
        console.log(res6);
    } catch (err) {
        console.log('-- Error --');
        console.log(err);
    }    
}

// run the test
test();
