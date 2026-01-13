import { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

const ChatPanel = ({ isVisible, meetingId, userName }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'Dr. Priya Sharma',
      message: 'Welcome to today\'s Ayurveda class! Please introduce yourselves.',
      timestamp: new Date(Date.now() - 300000),
      isInstructor: true
    },
    {
      id: 2,
      user: 'Rahul Kumar',
      message: 'Hello everyone! Excited to learn about Doshas today.',
      timestamp: new Date(Date.now() - 240000),
      isInstructor: false
    },
    {
      id: 3,
      user: 'Priya Patel',
      message: 'Good morning! Looking forward to the session.',
      timestamp: new Date(Date.now() - 180000),
      isInstructor: false
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      user: userName || 'You',
      message: newMessage.trim(),
      timestamp: new Date(),
      isInstructor: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-900">Class Chat</h3>
        <p className="text-sm text-gray-600">{messages.length} messages</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="group">
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                msg.isInstructor 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-300 text-gray-700'
              }`}>
                {msg.user.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${
                    msg.isInstructor ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {msg.user}
                    {msg.isInstructor && (
                      <span className="ml-1 px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                        Instructor
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mt-1 break-words">
                  {msg.message}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            maxLength={500}
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <PaperAirplaneIcon className="w-4 h-4" />
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          {newMessage.length}/500 characters
        </p>
      </div>
    </div>
  );
};

export default ChatPanel;