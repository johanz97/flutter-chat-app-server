const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');
//Mensajes de sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token'])
    //Verificar autenticación
    if (!valido) { return client.disconnect(); }
    //Cliente autenticado
    usuarioConectado(uid);
    //Unir usuario a una sala
    client.join(uid);

    //Escuchar mensaje-personal
    client.on('mensaje-personal', async (payload) => {
        //Grabar mensaje
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    });

    client.on('disconnect', () => { usuarioDesconectado(uid); });
    //Escuchar mensaje
    //client.on('mensaje', (payload) => {
    //    console.log('Mensaje', payload);
    //    io.emit('mensaje', { admin: 'Nuevo mensaje' });
    //});
});