//mqtt 모듈 객체 생성
var mqtt = require('mqtt');

// 클라이언트 mqtt 연결
var client = mqtt.connect('mqtt://52.78.82.238'); // 52.78.82.238은 EC2 인스턴스의 퍼블릭 ip
//console.log('Client Connected');

//fs(file system) 모듈 객체 생성
var file_system = require('fs');

// 파일 데이터 가져오기
file = 'LostArk.jpg';
data = file_system.readFileSync(file);

// 데이터 전송용 버퍼 생성
buf = {
  "name" : file,
  "data" : data.toString('base64')
};

// 파일 전송
client.on('connect', function() {
  //client.subscribe('hello/file');
  client.publish('hello/file', JSON.stringify(buf));
  console.log('hello/file : Send OK');
  client.end();

});
