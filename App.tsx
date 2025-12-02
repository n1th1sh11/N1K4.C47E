import React, { useState, useEffect, useCallback } from 'react';
import GlitchText from './components/GlitchText';
import ChatInterface from './components/ChatInterface';
import Button from './components/Button';
import { Message, UserSession, ConnectionStatus } from './types';
import { initializeGemini, startChat, sendMessageToGemini } from './services/geminiService';

const App: React.FC = () => {
  const [session, setSession] = useState<UserSession>({
    username: '',
    isLoggedIn: false,
    connectedAt: new Date(),
  });
  
  const [tempUsername, setTempUsername] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize Gemini on mount
  useEffect(() => {
    initializeGemini();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tempUsername.length < 3) return;

    setConnectionStatus(ConnectionStatus.CONNECTING);
    
    // Simulate connection sequence
    setTimeout(() => setConnectionStatus(ConnectionStatus.CONNECTED), 800);
    setTimeout(() => setConnectionStatus(ConnectionStatus.ENCRYPTED), 1600);
    setTimeout(async () => {
      setSession({
        username: tempUsername,
        isLoggedIn: true,
        connectedAt: new Date(),
      });
      
      // Initialize chat with AI
      await startChat();
      
      // Initial greeting
      addMessage({
        role: 'model',
        text: 'identity verified. terminal access granted. \nwaiting for input...',
        timestamp: new Date()
      });
    }, 2400);
  };

  const addMessage = (msg: Omit<Message, 'id'>) => {
    const newMsg: Message = {
      ...msg,
      id: Math.random().toString(36).substring(7),
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const handleSendMessage = useCallback(async (text: string) => {
    // Add user message
    addMessage({ role: 'user', text, timestamp: new Date() });
    
    setIsProcessing(true);

    // Get AI response
    try {
        const responseText = await sendMessageToGemini(text);
        addMessage({ role: 'model', text: responseText, timestamp: new Date() });
    } catch (err) {
        addMessage({ role: 'system', text: 'ERROR: SIGNAL LOST', timestamp: new Date() });
    } finally {
        setIsProcessing(false);
    }
  }, []);

  // Login Screen Render
  if (!session.isLoggedIn) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 relative scanlines flicker">
        <div className="max-w-md w-full border border-hacker-green/50 bg-black/90 p-8 shadow-[0_0_50px_rgba(0,255,0,0.1)] relative overflow-hidden">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-hacker-green"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-hacker-green"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-hacker-green"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-hacker-green"></div>

            <div className="text-center mb-10">
                <GlitchText text="N1K4.ch47" className="text-4xl md:text-6xl font-bold tracking-tighter mb-2 block" />
                <p className="text-hacker-green/60 text-sm tracking-[0.3em] uppercase">Secure Terminal Gateway</p>
            </div>

            {connectionStatus === ConnectionStatus.DISCONNECTED ? (
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="username" className="block text-xs uppercase tracking-widest text-hacker-green/70">
                            Enter Identity Alias
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={tempUsername}
                            onChange={(e) => setTempUsername(e.target.value.toUpperCase())}
                            className="w-full bg-hacker-gray/20 border border-hacker-green/30 text-hacker-green p-3 text-center font-mono focus:border-hacker-green focus:outline-none focus:ring-1 focus:ring-hacker-green transition-all"
                            placeholder="CODENAME"
                            autoComplete="off"
                            autoFocus
                        />
                    </div>
                    <Button 
                        type="submit" 
                        className="w-full"
                        disabled={tempUsername.length < 3}
                    >
                        INITIALIZE UPLINK
                    </Button>
                </form>
            ) : (
                <div className="space-y-4 py-8">
                    <div className="h-1 w-full bg-hacker-gray/30 overflow-hidden">
                        <div className="h-full bg-hacker-green animate-[scanline_1s_ease-in-out_infinite] w-full origin-left"></div>
                    </div>
                    <p className="text-center font-mono text-sm animate-pulse text-hacker-green">
                        {connectionStatus}
                    </p>
                    <div className="font-mono text-xs text-center text-hacker-green/50">
                        {connectionStatus === ConnectionStatus.CONNECTING && "Handshaking..."}
                        {connectionStatus === ConnectionStatus.CONNECTED && "Bypassing Firewalls..."}
                        {connectionStatus === ConnectionStatus.ENCRYPTED && "Establishing Neural Link..."}
                    </div>
                </div>
            )}
        </div>
      </div>
    );
  }

  // Chat Screen Render
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-0 md:p-4 scanlines relative">
       <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,50,0,0.1)_0%,rgba(0,0,0,0.8)_100%)]"></div>
       <ChatInterface 
         messages={messages} 
         session={session} 
         onSendMessage={handleSendMessage}
         isProcessing={isProcessing}
       />
    </div>
  );
};

export default App;