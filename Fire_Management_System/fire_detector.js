// fire_detector.js

var awsIot = require('aws-iot-device-sdk')

var device = awsIot.device({
  keyPath: "./fire_detector/b59b8e3c83-private.pem.key",
  certPath: "./fire_detector/b59b8e3c83-certificate.pem.crt",
  caPath: "./AmazonRootCA1.pem",
  clientId: "fire_detector",
  host: "amu5mgd3b3zvv-ats.iot.ap-northeast-2.amazonaws.com"
});

device.on('connect', function() {
  console.log('connect : fire_detector');
  /*
  // fire/alert를 구독할 수 있으나 구독하란 명시가 없으므로 제외

  device.subscribe('fire/alert', () => {
    console.log('subscribe to fire/alert');}); */

  //불이 감지되면 fire/alarm에 publish
  // fire/alarm에 매 3초 마다 항상 화재 알림을 publish 한다. (조건)

  setInterval(function() {
    device.publish('fire/alarm', 'fire alarm!');
  }, 3000);
});
