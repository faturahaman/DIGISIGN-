"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface ChatContextValue {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  pendingMessage: string | null;
  sendMessage: (text: string) => void;
  clearPending: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);

  const sendMessage = useCallback((text: string) => {
    setIsOpen(true);
    setPendingMessage(text);
  }, []);

  const clearPending = useCallback(() => setPendingMessage(null), []);

  return (
    <ChatContext.Provider value={{ isOpen, openChat, closeChat, pendingMessage, sendMessage, clearPending }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
