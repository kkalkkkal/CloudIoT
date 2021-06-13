//fire_sprinkler.js

var awsIot = require('aws-iot-device-sdk')

var device = awsIot.device({
  keyPath: "./doorLock/1e0bf99d9e-private.pem.key",
  certPath: "./fire_sprinkler/1e0bf99d9e-certificate.pem.crt",
  caPath: "./AmazonRootCA1.pem",
  clientId: "door_lock",
  host: "amu5mgd3b3zvv-ats.iot.ap-northeast-2.amazonaws.com"
});

device.on('connect', function() {
  console.log('connect : door_lock');
  device.subscribe('faceRecog/notify/door1', () => {
    console.log('subscribe to faceRecog/notify/door1');}); // faceRecog/notify/door1 구독



});

device.on('message', function(topic, message){
  console.log('message', topic, message.toString());

});
