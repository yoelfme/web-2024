'use client';

// Socket.io client
import io from 'socket.io-client';

// Socket.io server
const socket = io('ws://localhost:3001', {
    transports: ['websocket']
});

export default socket;