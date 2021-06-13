//Face Recognition System with Promiss

var AWS = require('aws-sdk');
var iotdata = new AWS.IotData({
    endpoint : 'amu5mgd3b3zvv-ats.iot.ap-northeast-2.amazonaws.com',
    accessKeyId : 'AKIAV7ANXPMGACVQ3J23',
    secretAccessKey : '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'})

//var AWS = require('aws-sdk')
var bucket        = '2021-faceimage-s3' // the bucketname without s3://
var photo_source  = "person1.jpg" // 기준점
var photo_target  = "image/test.jpg" // 비교대상

AWS.config.region = 'ap-northeast-2';
AWS.config.apiVersions = {
    s3: '2006-03-01',
};

AWS.config.update({
 accessKeyId: 'AKIAV7ANXPMGACVQ3J23',
 secretAccessKey: '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',
})


const client = new AWS.Rekognition(); // recognition 호출

function FaceRecog(ex_params){
    return new Promise(function (resolve, reject) {
        client.compareFaces(ex_params, function(err, response) {
           if (err) {
             console.log(err, err.stack); // an error occurred
             reject(err);
           } else {
             resolve(response);
             response.FaceMatches.forEach(data => {
               let position   = data.Face.BoundingBox
               let similarity = data.Similarity
               res = console.log(`The face at: ${position.Left}, ${position.Top} matches with ${similarity} % confidence`)
               if(similarity > 99)
               {
                   var statusCode = 200
                   var res = 'ok'
               }
             }) // for response.faceDetails
           } // if
        });
    });
};

exports.handler = async function (event, context) {

    var registeredImage = ['person1.jpg', 'person2.png', 'person3.jpg', 'person4.jpg'];

    // 비교 진행
    var step;
    for (step = 0; step < 4; step++) {
      // Runs 4 times, with values of step 0 through 3.
        photo_source = registeredImage[step]
        photo_target = event.image

        var params = {
        SourceImage: { // 비교 원본
         S3Object: {
           Bucket: bucket,
           Name: photo_source
         },
        },
        TargetImage: { // 비교 대상
         S3Object: {
           Bucket: bucket,
           Name: photo_target
         },
        },
        SimilarityThreshold: 70
        }

        var result = await FaceRecog(params);

        if(Array.isArray(result.FaceMatches) && result.FaceMatches.length === 0) // 검출된 것이 있는지 확인
        {

        } else {
            if( result.FaceMatches[0].Similarity >= 99 ) // 일치율이 99% 이상일때만 통과
            {
                if (step == 1)
                {
                  var params2 = {
                      topic : "faceRecog/notify/door1",
                      payload: JSON.stringify({'image' : "person2", 'command' : 'unlock'}),
                      qos : 0
                  };

                } else {
                  var params2 = {
                      topic : "faceRecog/notify/door1",
                      payload: JSON.stringify({'image' : "person" + (step + 1), 'command' : 'unlock'}),
                      qos : 0
                  };

                }

                var res = await iotdata.publish(params2).promise();
            }
        }


    }

    var params2 = {
        topic : event.notify,
        payload: JSON.stringify({'image' : "none", 'command' : 'reject'}),
        qos : 0
    };

    var res = await iotdata.publish(params2).promise();
    return res


};
