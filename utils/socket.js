const fs = require('fs');
const path = require('path');

module.exports = (server) => {

    const io = require('socket.io')(server),
          connected = {},
          mwSocket = (socket, next) => {
            next();
          };

    io.use(mwSocket);
    io.on('connection', (socket) => {

        connected[socket.id] = socket.id;

        socket.on('play', msg => {
            var stream = fs.createReadStream(path.join(__dirname, '..', 'public', 'uploads', msg));

            stream.on('data', (chunk) => {
              socket.emit('playSong', chunk);
            })
        });

        socket.on('datacome', data => {
          console.log(data);
        });

        socket.on('disconnect', () => {
            console.log(connected[socket.id]+" was deleted");
            delete connected[socket.id];
        });

    });
}
