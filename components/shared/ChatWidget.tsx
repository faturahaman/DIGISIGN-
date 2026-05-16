'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useChat } from '@/lib/ChatContext';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function ChatWidget() {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();
  const { isOpen, openChat, closeChat, pendingMessage, clearPending } = useChat();

  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: t.chat.initialMessage }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle pending message from FAQ section
  useEffect(() => {
    if (pendingMessage && isOpen) {
      clearPending();
      handleSend(pendingMessage);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingMessage, isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { role: 'user' as const, content: text }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages([...newMessages, { role: 'model', content: data.reply }]);
      } else {
        let errorMsg: string = t.chat.errorGeneral;
        if (data.error?.toLowerCase().includes('quota') || data.error?.toLowerCase().includes('limit')) {
          errorMsg = t.chat.errorBusy;
        } else if (data.error) {
          errorMsg = data.error;
        }
        setMessages([...newMessages, { role: 'model', content: errorMsg }]);
      }
    } catch {
      setMessages([...newMessages, { role: 'model', content: t.chat.errorConnection as string }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (msg: Message, index: number) => {
    const parts = msg.content.split('QUICK_REPLIES:');
    const textContent = parts[0].trim();
    let quickReplies: string[] = [];

    if (parts.length > 1) {
      try {
        quickReplies = JSON.parse(parts[1].trim());
      } catch {
        // ignore parse error
      }
    }

    return (
      <div key={index} className={`flex flex-col mb-4 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
        <div
          className={`max-w-[85%] p-3.5 rounded-2xl ${
            msg.role === 'user'
              ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-tr-sm shadow-[0_0_15px_rgba(139,92,246,0.3)]'
              : 'bg-[#1E293B] border border-white/10 text-gray-100 rounded-tl-sm shadow-lg'
          }`}
        >
          <p className="text-[14px] leading-relaxed whitespace-pre-wrap">{textContent}</p>
        </div>

        {quickReplies.length > 0 && msg.role === 'model' && index === messages.length - 1 && (
          <div className="flex flex-wrap gap-2 mt-3 w-full justify-start pl-1">
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => handleSend(reply)}
                disabled={isLoading}
                className="text-[12px] px-3.5 py-2 bg-[#0B1120] border border-violet-500/40 text-violet-300 rounded-full font-medium hover:bg-violet-500/20 hover:text-white hover:border-violet-500/60 transition-all shadow-[0_0_10px_rgba(139,92,246,0.1)] hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] disabled:opacity-50"
              >
                {reply}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 md:right-8 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-8rem)] bg-[#0B1120]/95 backdrop-blur-xl border border-violet-500/30 rounded-2xl flex flex-col overflow-hidden z-[60] shadow-[0_0_40px_-10px_rgba(139,92,246,0.4)]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-900/40 to-blue-900/40 p-4 border-b border-violet-500/30 flex justify-between items-center shrink-0 relative overflow-hidden">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-violet-500/20 rounded-full blur-2xl" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)] border border-white/20 overflow-hidden">
                  <img src="/maskot.png" alt="DigiMin Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-white leading-tight text-base tracking-wide">DigiMin - Ai</h3>
                  <p className="text-[11px] font-medium text-violet-300 uppercase tracking-widest">{t.chat.status}</p>
                </div>
              </div>
              <button
                onClick={closeChat}
                className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-red-500/80 hover:border-transparent text-gray-400 hover:text-white transition-all relative z-10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#050816]/40 scrollbar-thin scrollbar-thumb-violet-500/20 scrollbar-track-transparent">
              {messages.map((msg, index) => renderMessage(msg, index))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-[#1E293B] border border-white/10 p-4 rounded-2xl rounded-tl-sm shadow-lg">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-[#0B1120] border-t border-violet-500/30 shrink-0">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="flex gap-2 relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.chat.placeholder}
                  className="flex-1 bg-[#1E293B] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-[14px] text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all shadow-inner"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 top-1.5 bottom-1.5 aspect-square bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg flex items-center justify-center hover:opacity-90 disabled:opacity-50 disabled:hover:opacity-50 transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 md:right-8 md:bottom-8 z-[60] flex flex-col items-end gap-2">
        {/* Mobile Label */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[#0B1120]/95 text-white text-[10px] font-bold px-3 py-1 rounded-full border border-violet-500/30 shadow-lg"
          >
            {t.chat.label}
          </motion.div>
        )}

        {/* Desktop hover label */}
        <AnimatePresence>
          {isHovered && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="hidden md:block bg-[#0B1120]/95 text-white text-xs font-bold px-4 py-2 rounded-full border border-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.2)] backdrop-blur-md whitespace-nowrap"
            >
              {t.chat.desktopLabel}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => (isOpen ? closeChat() : openChat())}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="bg-gradient-to-r from-violet-600 to-blue-600 text-white border border-white/20 rounded-full p-4 hover:scale-105 transition-all shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] group relative"
        >
          <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </>
  );
}
