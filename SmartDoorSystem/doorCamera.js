// doorCamera.js

var awsIot = require('aws-iot-device-sdk')

var device = awsIot.device({
  keyPath: "./doorCamera/ba60f6ba37-private.pem.key",
  certPath: "./doorCamera/ba60f6ba37-certificate.pem.crt",
  caPath: "./AmazonRootCA1.pem",
  clientId: "door_camera",
  host: "amu5mgd3b3zvv-ats.iot.ap-northeast-2.amazonaws.com"
});

var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.region = 'ap-northeast-2';
AWS.config.apiVersions = {
    s3: '2006-03-01',
};
var s3 = new AWS.S3({
    "accessKeyId": "AKIAV7ANXPMGACVQ3J23",
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

var test = async function () {
    try {
        // 1st Object
        const co_params1 = {
            Bucket: "2021-kkalkkkal-s3-test",
            Key: 'image/test.jpg',
            Body: fs.createReadStream("./test.jpg")
        };
        var res2 = await createObject(co_params1);
        console.log(res2);

    } catch (err) {
        console.log('-- Error --');
        console.log(err);
    }
}

device.on('connect', function() {
  console.log('connect : door_camera');


  setInterval(function() {
    device.publish('faceRecog/required', 'fire alarm!');
  }, 3000);
});
