import React, { useRef, useEffect, useState } from 'react';
import { Message, UserSession } from '../types';
import Button from './Button';

interface ChatInterfaceProps {
  messages: Message[];
  session: UserSession;
  onSendMessage: (text: string) => void;
  isProcessing: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  messages, 
  session, 
  onSendMessage, 
  isProcessing 
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isProcessing) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto border-x border-hacker-green/20 bg-black/80 relative">
      {/* Chat Header */}
      <div className="border-b border-hacker-green/30 p-4 bg-hacker-green-dim/10 flex justify-between items-center backdrop-blur-sm sticky top-0 z-10">
        <div className="flex flex-col">
          <span className="text-xs text-hacker-green/60 uppercase tracking-widest">Target ID</span>
          <span className="text-lg font-bold text-hacker-green tracking-wide">N1K4.AI</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-hacker-green/60 uppercase tracking-widest">Uplink</span>
          <span className="text-xs text-hacker-green animate-pulse">SECURE [256-BIT]</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono scrollbar-thin">
        {/* System Banner */}
        <div className="text-center py-6 text-hacker-green/40 text-xs border-b border-dashed border-hacker-green/20 mb-6">
          <p>*** ENCRYPTED CONNECTION ESTABLISHED ***</p>
          <p>LOGGED IN AS: {session.username.toUpperCase()}</p>
          <p>{session.connectedAt.toISOString()}</p>
        </div>

        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col max-w-[85%] animate-appear ${
              msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
            }`}
          >
            <div className="flex items-baseline space-x-2 mb-1 opacity-70">
              <span className={`text-[10px] uppercase font-bold tracking-wider ${
                msg.role === 'user' ? 'text-blue-400' : 'text-hacker-green'
              }`}>
                {msg.role === 'user' ? session.username : 'N1K4'}
              </span>
              <span className="text-[10px] text-gray-500">[{formatTime(msg.timestamp)}]</span>
            </div>
            
            <div className={`p-3 border-l-2 relative overflow-hidden group ${
              msg.role === 'user' 
                ? 'border-blue-500 bg-blue-900/10 text-blue-100' 
                : 'border-hacker-green bg-hacker-green/5 text-hacker-green'
            }`}>
              {/* Message Content */}
              <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base shadow-sm">
                {msg.text}
              </p>
            </div>
          </div>
        ))}

        {isProcessing && (
          <div className="flex flex-col mr-auto items-start animate-appear">
             <div className="flex items-baseline space-x-2 mb-1 opacity-70">
              <span className="text-[10px] uppercase font-bold tracking-wider text-hacker-green">N1K4</span>
            </div>
            <div className="p-3 border-l-2 border-hacker-green bg-hacker-green/5">
              <span className="inline-block w-2 h-4 bg-hacker-green animate-blink align-middle ml-1"></span>
              <span className="text-xs text-hacker-green/70 ml-2 animate-pulse">COMPUTING...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-hacker-green/30 bg-black sticky bottom-0 z-20">
        <form onSubmit={handleSubmit} className="flex gap-4 items-end">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-hacker-green font-bold text-lg">{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isProcessing}
              placeholder="ENTER COMMAND..."
              className="w-full bg-hacker-gray/30 border border-hacker-green/30 text-hacker-green pl-8 pr-4 py-3 focus:outline-none focus:border-hacker-green focus:ring-1 focus:ring-hacker-green/50 placeholder-hacker-green/30 font-mono text-sm md:text-base transition-all"
            />
          </div>
          <Button 
            type="submit" 
            disabled={!inputValue.trim() || isProcessing}
            className={(!inputValue.trim() || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''}
          >
            SEND
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
