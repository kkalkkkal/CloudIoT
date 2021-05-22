//fire_sprinkler.js

var awsIot = require('aws-iot-device-sdk')

var device = awsIot.device({
  keyPath: "./fire_sprinkler/ad9ec05d69-private.pem.key",
  certPath: "./fire_sprinkler/ad9ec05d69-certificate.pem.crt",
  caPath: "./AmazonRootCA1.pem",
  clientId: "fire_sprinkler",
  host: "amu5mgd3b3zvv-ats.iot.ap-northeast-2.amazonaws.com"
});

device.on('connect', function() {
  console.log('connect : fire_sprinkler');
  device.subscribe('fire/sprinkler', () => {
    console.log('subscribe to fire/sprinkler');}); // fire/sprinkler 구독

  // fire/alert를 구독할 수 있으나 구독하란 명시가 없으므로 제외
/*
  device.subscribe('fire/alert', () => {
    console.log('subscribe to fire/alert');}); // fire/alert 구독
*/

});

device.on('message', function(topic, message){
  console.log('message', topic, message.toString());

});
