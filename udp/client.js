const PORT = 33333;
const HOST = '127.0.0.1';

const dgram = require('dgram');
const message = new Buffer('My KungFu is Good!');

const client = dgram.createSocket('udp4');
client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
  if (err) throw err;
  console.log('UDP message sent to ' + HOST +':'+ PORT);
  client.close();
});
