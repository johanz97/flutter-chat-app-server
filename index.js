//Importar extensiones
const express = require('express');
const path = require('path');
//Leyendo el .env
require('dotenv').config();

//db Config
require('./database/config').dbConnection();

//Crear aplicacion de express
const app = express();

//Lectura y parseo del body
app.use(express.json());

//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

//Path publico
const publicPath = path.resolve(__dirname, 'public');

//Usar publicPath
app.use(express.static(publicPath));

//Mis rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/mensajes', require('./routes/mensajes'));

//Montar el servidor 
server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto:', process.env.PORT);
});