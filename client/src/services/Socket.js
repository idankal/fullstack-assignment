import io from 'socket.io-client';

let socket;

const Init = (uri) => {
  socket = io(uri);
  socket.on('connect', () => {
    console.log('socket connect');
  })
}

const Emit = (obj, cb) => {
  socket.emit(obj.message, obj.value);
  socket.on(obj.cb, res => {
    if(!res) return cb(false);
    cb(res);
    socket.removeListener(obj.cb);
  });
}


export { Init, Emit };
