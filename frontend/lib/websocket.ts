// WebSocket клієнт для чату в реальному часі

type MessageHandler = (message: any) => void;

class WebSocketClient {
  private ws: WebSocket | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;
  private messageHandlers: Set<MessageHandler> = new Set();
  private isConnecting = false;

  constructor(url?: string) {
    this.url = url || process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000/ws';
  }

  connect(token?: string) {
    if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.OPEN)) {
      return;
    }

    this.isConnecting = true;
    const wsUrl = token ? `${this.url}?token=${token}` : this.url;

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.isConnecting = false;
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.messageHandlers.forEach((handler) => handler(data));
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.isConnecting = false;
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.isConnecting = false;
        this.attemptReconnect(token);
      };
    } catch (error) {
      console.error('Failed to create WebSocket:', error);
      this.isConnecting = false;
    }
  }

  private attemptReconnect(token?: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      
      setTimeout(() => {
        this.connect(token);
      }, this.reconnectDelay);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  onMessage(handler: MessageHandler) {
    this.messageHandlers.add(handler);
    
    return () => {
      this.messageHandlers.delete(handler);
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.messageHandlers.clear();
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}

// Експорт singleton instance
export const wsClient = new WebSocketClient();

// Хук для використання WebSocket в React компонентах
export function useWebSocket(onMessage?: MessageHandler) {
  if (typeof window === 'undefined') return null;

  // Підключаємось при монтуванні
  const token = localStorage.getItem('auth_token');
  if (!wsClient.isConnected()) {
    wsClient.connect(token || undefined);
  }

  // Додаємо обробник повідомлень
  if (onMessage) {
    const unsubscribe = wsClient.onMessage(onMessage);
    return unsubscribe;
  }

  return null;
}

// Відправка повідомлення в чат
export function sendChatMessage(conversationId: number, message: string) {
  wsClient.send({
    type: 'chat_message',
    conversation_id: conversationId,
    message,
  });
}

// Позначити повідомлення як прочитане
export function markAsRead(conversationId: number, messageId: number) {
  wsClient.send({
    type: 'mark_read',
    conversation_id: conversationId,
    message_id: messageId,
  });
}

// Typing indicator
export function sendTypingIndicator(conversationId: number, isTyping: boolean) {
  wsClient.send({
    type: 'typing',
    conversation_id: conversationId,
    is_typing: isTyping,
  });
}
