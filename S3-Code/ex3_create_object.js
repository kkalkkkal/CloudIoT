
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
            Bucket: "cws-lab-s3-v2",
            Key: 'images/shinhyeseon.jpg',
            Body: fs.createReadStream("./shinhyeseon.jpg")
        };
        var res2 = await createObject(co_params1);
        console.log(res2);

        // 2nd Object
        const co_params2 = {
            Bucket: "cws-lab-s3-v2",
            Key: 'images/lunmeikwai.jpg',
            Body: fs.createReadStream("./lunmeikwai.jpg")
        };
        var res3 = await createObject(co_params2);
        console.log(res3);
    } catch (err) {
        console.log('-- Error --');
        console.log(err);
    }
}

// run the test
test();
