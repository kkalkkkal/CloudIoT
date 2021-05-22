//fire_management_system.js

var awsIot = require('aws-iot-device-sdk')

var device = awsIot.device({
  keyPath: "./fire_management_system/75beac1b24-private.pem.key",
  certPath: "./fire_management_system/75beac1b24-certificate.pem.crt",
  caPath: "./AmazonRootCA1.pem",
  clientId: "fire_management_system",
  host: "amu5mgd3b3zvv-ats.iot.ap-northeast-2.amazonaws.com"
});

device.on('connect', function() {
  console.log('connect : fire_management_system');
  device.subscribe('fire/alarm', () => {
    console.log('subscribe to fire/alarm');}); // fire/alarm 구독

/*
// fire/alert를 구독할 수 있으나 구독하란 명시가 없으므로 제외

  device.subscribe('fire/alert', () => {
    console.log('subscribe to fire/alert');}); // fire/alert 구독
*/
});

device.on('message', function(topic, payload){
  console.log('message', topic, payload.toString());

  // 화재 경보가 울리면 화재 경고 메시지를 publish 함.
  // 현재 구독한 것이 fire/alarm 밖에 없기 때문에 굳이 if문을 안 넣어도 됨. 
  device.publish('fire/alert', "fire! fire! fire!");

  // fire/alarm 토픽을 통해 화재 발생을 알게 되면 sprinkler에 activation command를 publish
  device.publish('fire/sprinkler', "activate sprinkler!");
});
