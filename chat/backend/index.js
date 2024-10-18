const express = require('express'); 
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Enable cors
app.use(cors());

// Create http server
const server = http.createServer(app);

// New Socket.io Server
const io = new Server(server);

app.get('/', (req, res) => {
    res.send('<h1>Hola Mundo 2</h1>');
});

app.get('/users', async (req, res) => {
   const users = await getUsers();

    res.json(users);
});

const getUsers = async () => {
    const sockets = await io.fetchSockets();
    return sockets.map(socket => socket.data.username);
}

io.on('connection', async (socket) => {
    const randomId = Math.random().toString(36).substring(2, 15);
    const { username = `Anonymous-${randomId}` } = socket.handshake.query;
    console.log('a user connected', socket.id, username);
    
    socket.data.username = username;

    socket.emit('users', await getUsers());

    // const room = rooms[username];
    // socket.join(room);

    socket.on('disconnect', async () => {
        console.log(`${username} disconnected`);
        socket.emit('users', await getUsers());
        // socket.broadcast.emit('users', await getUsers());
    });

    socket.on('chat_message', (msg) => {
        console.log('message: ', msg);
        io.emit('chat_message', `${username}: ${msg}`);
        // io.to(room).emit('chat_message', `${username}: ${msg}`);
    });
});

server.listen(3001, () => {
    console.log('Servidor corriendo en http://localhost:3001');
});

