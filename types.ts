export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
  isTyping?: boolean;
}

export interface UserSession {
  username: string;
  isLoggedIn: boolean;
  connectedAt: Date;
}

export enum ConnectionStatus {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING...',
  CONNECTED = 'CONNECTED',
  ENCRYPTED = 'ENCRYPTED'
}
