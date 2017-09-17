import openSocket from 'socket.io-client';
const  socket = openSocket('http://5920f809.ngrok.io');

function updatePoints(cb) {
  console.log('polling data')
  socket.on('updating data', data => cb(null, data));
  // socket.emit('connection', 1000);
}
export { updatePoints };
