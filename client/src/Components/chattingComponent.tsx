import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { ChattingRoom } from '../Util/types';

const socket = io('http://localhost:3000');

interface Message {
  id: string;
  text: string;
}

const ChattingComponent: React.FC<ChattingRoom> = ({ roomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit('join', roomId);
    //서버에서 받음
    socket.on('chat message', (msg: Message) => {
      setMessages((messages: Message[]) => [...messages, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, [roomId]);

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();
    socket.emit('chat message', { room: roomId, message: inputValue });
    setInputValue('');
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const leaveRoom = () => {
    socket.emit('leave', roomId);
    navigate('/chatlist');
  };

  return (
    <div className=" bg-white shadow-custom mx-auto flex flex-col  space-y-3 w-full h-full sm:w-full sm:h-full md:w-[600px] md:h-[700px] p-4 border border-#e0e0e0 rounded-xl">
      <ul id="messages">
        {messages.map((message: { id: string; text: string }) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          id="input"
          autoComplete="off"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Send</button>
      </form>
      <button onClick={leaveRoom}>Leave Room</button>
    </div>
  );
};

export default ChattingComponent;
