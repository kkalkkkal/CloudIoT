//Face Recognition System with Promiss

var AWS = require('aws-sdk')
var bucket        = '2021-faceimage-s3' // the bucketname without s3://

var photo_source  = "person1.jpg" // 기준점
var photo_target  = "person1.jpg" // 비교대상

AWS.config.region = 'ap-northeast-2';
AWS.config.apiVersions = {
    s3: '2006-03-01',
};

AWS.config.update({
 accessKeyId: 'AKIAV7ANXPMGACVQ3J23',
 secretAccessKey: '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',
})

  const client = new AWS.Rekognition(); // recognition 호출
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

  var statusCode = 0;
  var res = 'none';

  // 비교 진행
  client.compareFaces(params, function(err, response) {
   if (err) {
     console.log(err, err.stack); // an error occurred
   } else {
     response.FaceMatches.forEach(data => {
       let position   = data.Face.BoundingBox
       let similarity = data.Similarity
       res = console.log(`The face at: ${position.Left}, ${position.Top} matches with ${similarity} % confidence`)
       if(similarity > 99)
       {
           statusCode = 200
           res = 'ok'
       }

     }) // for response.faceDetails
   } // if
  }).promise();
