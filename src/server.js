import Server from 'socket.io';

export function startServer(store) {
  const io = new Server().attach(8090);
  //send application state to client as changes
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );
  //send current application state when client connects
  //clients remote actions are fwd'd back as action events
  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });

}
