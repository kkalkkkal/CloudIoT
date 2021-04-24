//mqtt 모듈 객체 생성
var mqtt = require('mqtt');

//client 객체 mqtt 연결
var client = mqtt.connect('mqtt://52.78.82.238'); // 52.78.82.238은 EC2 인스턴스의 퍼블릭 ip

//fs(file system) 모듈 객체 생성
var file_system = require('fs');

// client 연결
client.on('connect', function () {
      client.subscribe('hello/file', () => {
        console.log('subscribe to hello/file');}); // hello/file
});

// 파일 수신
client.on('message', function (topic, message) {
      data = JSON.parse(message);
      file_system.writeFileSync('LostArk2.jpg', data.data); // 'LostArk2'라는 이름으로 파일 생성
      console.log(data.data);
//      console.log(topic, message.toString());
      client.end();
});
