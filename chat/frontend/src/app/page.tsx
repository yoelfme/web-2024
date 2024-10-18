'use client';

import socket from '@/socket';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Message = {
  username: string;
  content: string;
}


export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // const handleSendMessage = () => {
  //   if (newMessage.trim() !== "") {
  //     const newMsg: Message = {
  //       id: messages.length + 1,
  //       username: "You", // In a real app, this would be the current user's name
  //       content: newMessage.trim(),
  //     };
  //     setMessages([...messages, newMsg]);
  //     setNewMessage("");
  //   }
  // };

  // const handleNewMessage = (msg: string) => {
  //   setMessages([...messages, msg]);
  //   setNewMessage("");
  // }

  const parseMessage = (msg: string) => {
    const [username, content] = msg.split(": ");
    return { username, content } as Message;
  }


  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      socket.io.engine.on("upgrade", (transport) => {
        // setTransport(transport.name);
      });
    }

    function onDisconnect() {
      // setIsConnected(false);
      // setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  socket.on('chat_message', (msg) => {
    const newMessage = parseMessage(msg);
    setMessages([...messages, newMessage]);
  });

  socket.on('users', (users) => {
    setUsers(users);
  });

return (
    <div className="mt-10 max-w-md mx-auto p-4 bg-background rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <div id="users" className="mb-4">
        {users.map((user) => (
          <div key={user}>{user}</div>
        ))}
      </div>
      <h2 className="text-2xl font-bold mb-4">Chat</h2>
      <div className="space-y-4 mb-4 h-80 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.content} className="p-2 bg-muted rounded">
            <span className="font-semibold">{message.username}: </span>
            {message.content}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow"
        />
        {/* <Button onClick={handleSendMessage}>Send</Button> */}
      </div>
    </div>
  );
}
