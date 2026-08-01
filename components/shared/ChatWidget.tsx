'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowUp, MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useChat } from '@/lib/ChatContext';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function ChatWidget() {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { t } = useLanguage();
  const { isOpen, openChat, closeChat, pendingMessage, clearPending } = useChat();

  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: t.chat.initialMessage }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(1, scrollTop / maxScroll) : 0;
    setScrollProgress(progress);
    setShowScrollTop(scrollTop > 180);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

    if (msg.role === 'model') {
      const isInitial = index === 0;

      // Special layout for the very first AI message: avatar + bubble on the left, vertical quick replies on the right
      if (isInitial && quickReplies.length > 0) {
        return (
          <div key={index} className="mb-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 overflow-hidden shrink-0">
                <Image src="/arvionmaskot.png" alt="Arvion Mascot" width={24} height={24} className="w-6 h-6 object-contain" />
              </div>

              <div className="relative flex-1 min-w-0 p-4 rounded-2xl bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm overflow-hidden">
                <div className="relative">
                  <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{textContent}</p>
                </div>
              </div>
            </div>

            <div className="mt-3 ml-11 flex flex-col gap-3">
              {quickReplies.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(reply)}
                  disabled={isLoading}
                  className="text-[13px] px-4 py-2 bg-white border border-amber-200 text-amber-600 rounded-full font-medium hover:bg-amber-50 hover:border-amber-300 transition-all shadow-sm disabled:opacity-50"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        );
      }

      // Regular AI message: avatar + bubble, quick replies below (not beside) the bubble
      return (
        <div key={index} className="mb-4">
          <div className="flex items-start min-w-0">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 overflow-hidden shrink-0 mr-3">
              <Image src="/arvionmaskot.png" alt="Arvion Mascot" width={24} height={24} className="w-6 h-6 object-contain" />
            </div>

            <div className="relative flex-1 min-w-0 p-4 rounded-2xl bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm overflow-hidden">
              <div className="relative">
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{textContent}</p>
              </div>
            </div>
          </div>

          {quickReplies.length > 0 && index === messages.length - 1 && (
            <div className="mt-3 ml-11 flex flex-col gap-2">
              {quickReplies.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(reply)}
                  disabled={isLoading}
                  className="text-[13px] px-4 py-2 bg-white border border-amber-200 text-amber-600 rounded-full font-medium hover:bg-amber-50 hover:border-amber-300 transition-all shadow-sm disabled:opacity-50 text-left"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
        <div key={index} className={`flex flex-col mb-4 items-end`}>
        <div
          className={`max-w-[85%] p-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-violet-500 text-white rounded-tr-sm shadow-sm`}
        >
          <p className="text-[14px] leading-relaxed whitespace-pre-wrap">{textContent}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
            style={{ willChange: 'transform, opacity' }}
            className="fixed bottom-24 right-4 md:right-8 w-90 max-w-[calc(100vw-2rem)] h-130 max-h-[calc(100vh-8rem)] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl flex flex-col overflow-hidden z-60 shadow-xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-50 to-violet-50 p-4 border-b border-slate-200 flex justify-between items-center shrink-0 relative overflow-hidden">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 overflow-hidden">
                  <Image src="/arvionmaskot.png" alt="Arvion Mascot" width={40} height={40} className="w-10 h-10 object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight text-base tracking-wide">Arvion Assistant</h3>
                  <p className="text-[11px] font-bold text-amber-600 uppercase tracking-widest">{t.chat.status}</p>
                </div>
              </div>
              <button
                onClick={closeChat}
                aria-label={t.modal?.closeModal ?? "Close"}
                className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all relative z-10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              {messages.map((msg, index) => renderMessage(msg, index))}
              {isLoading && (
                <div className="flex mb-4 items-start">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 overflow-hidden shrink-0 mr-3">
                    <Image src="/arvionmaskot.png" alt="Arvion Mascot" width={24} height={24} className="w-6 h-6 object-contain" />
                  </div>
                  <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-sm shadow-sm">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-200 shrink-0">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="flex gap-2 relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.chat.placeholder}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-300 transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 top-1.5 bottom-1.5 aspect-square bg-gradient-to-r from-amber-500 to-violet-500 text-white rounded-lg flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-all shadow-sm"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 md:right-8 md:bottom-8 z-60 flex flex-col gap-2 items-end">
        {/* Mobile Label */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white text-slate-900 text-[10px] font-bold px-3 py-1 rounded-full border border-slate-200 shadow-sm"
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
              className="hidden md:block bg-white text-slate-900 text-xs font-bold px-4 py-2 rounded-full border border-slate-200 shadow-sm backdrop-blur-md whitespace-nowrap"
            >
              {t.chat.desktopLabel}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2">
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg ring-1 ring-slate-200 transition-transform hover:scale-105"
            >
              <svg className="absolute inset-1 h-12 w-12" viewBox="0 0 32 32" aria-hidden="true">
                <defs>
                  <linearGradient id="scrollProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
                <circle cx="16" cy="16" r="13" className="stroke-slate-200 fill-transparent" strokeWidth="2" />
                <circle
                  cx="16"
                  cy="16"
                  r="13"
                  stroke="url(#scrollProgressGradient)"
                  fill="transparent"
                  strokeWidth="2.5"
                  strokeDasharray={81.681}
                  strokeDashoffset={81.681 - scrollProgress * 81.681}
                  strokeLinecap="round"
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                />
              </svg>
              <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm">
                <ArrowUp className="h-5 w-5" />
              </span>
            </button>
          )}
          <button
            onClick={() => (isOpen ? closeChat() : openChat())}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label={isOpen ? "Tutup chat" : t.chat.desktopLabel}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-violet-500 text-white border border-amber-200 hover:scale-105 transition-all shadow-md group"
          >
            <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </>
  );
}
