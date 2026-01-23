'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Send, Search, MoreVertical } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isOwn: boolean;
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

export default function MessagesPage() {
  const [chats] = useState<Chat[]>([
    {
      id: 1,
      name: 'Олена Коваленко',
      avatar: '👩',
      lastMessage: 'Дякую за відповідь!',
      time: '10:30',
      unread: 2,
    },
    {
      id: 2,
      name: 'Андрій Шевченко',
      avatar: '👨',
      lastMessage: 'Коли можете приїхати?',
      time: 'Вчора',
      unread: 0,
    },
  ]);

  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'Олена Коваленко',
      text: 'Добрий день! Чи можете зробити манікюр завтра?',
      time: '10:25',
      isOwn: false,
    },
    {
      id: 2,
      sender: 'Ви',
      text: 'Так, звичайно! О котрій годині вам зручно?',
      time: '10:28',
      isOwn: true,
    },
    {
      id: 3,
      sender: 'Олена Коваленко',
      text: 'Дякую за відповідь! О 14:00 підійде?',
      time: '10:30',
      isOwn: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: messages.length + 1,
      sender: 'Ви',
      text: newMessage,
      time: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Повідомлення' }]} />

        <div className="bg-white rounded-lg shadow-sm mt-6 h-[calc(100vh-200px)] flex">
          {/* Список чатів */}
          <div className="w-1/3 border-r">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Пошук..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="overflow-y-auto h-[calc(100%-80px)]">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  className={`
                    w-full p-4 flex items-center space-x-3 hover:bg-gray-50 transition border-b
                    ${activeChat === chat.id ? 'bg-blue-50' : ''}
                  `}
                >
                  <div className="text-3xl">{chat.avatar}</div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{chat.name}</h3>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {chat.unread}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Вікно чату */}
          {activeChat ? (
            <div className="flex-1 flex flex-col">
              {/* Шапка чату */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">👩</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Олена Коваленко</h3>
                    <p className="text-sm text-gray-500">Онлайн</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical size={20} />
                </button>
              </div>

              {/* Повідомлення */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`
                        max-w-xs px-4 py-2 rounded-lg
                        ${message.isOwn
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                        }
                      `}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.isOwn ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Поле введення */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Напишіть повідомлення..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-primary-600 text-white p-3 rounded-lg hover:bg-primary-700 transition"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MessageCircle size={64} className="mx-auto mb-4 text-gray-300" />
                <p>Оберіть чат щоб почати спілкування</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
