"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Bot, User, ArrowUp, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@/lib/ChatContext";
import { SITE_BRAND } from "@/data/siteContent";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type Message = {
  role: "user" | "model";
  content: string;
  quickReplies?: string[];
};

const DEFAULT_SUGGESTIONS_ID = [
  "Layanan apa saja yang ada di Arvion?",
  "Berapa estimasi waktu pengerjaan?",
  "Bagaimana alur kerja 4 langkah Arvion?",
  "Lihat portofolio unggulan",
];

const DEFAULT_SUGGESTIONS_EN = [
  "What services does Arvion offer?",
  "Estimated timeline and cost?",
  "How does Arvion's 4-step process work?",
  "View featured portfolio",
];

// Helper to extract QUICK_REPLIES:[...] from AI content
function parseMessageContent(raw: string): { cleanContent: string; quickReplies: string[] } {
  const match = raw.match(/QUICK_REPLIES:\s*(\[[\s\S]*?\])/);
  if (match) {
    try {
      const parsed = JSON.parse(match[1]);
      if (Array.isArray(parsed)) {
        const cleanContent = raw.replace(/QUICK_REPLIES:\s*\[[\s\S]*?\]/, "").trim();
        return { cleanContent, quickReplies: parsed };
      }
    } catch {
      // ignore JSON parse error
    }
  }
  return { cleanContent: raw.trim(), quickReplies: [] };
}

export function ChatWidget() {
  const { lang } = useLanguage();
  const defaultSuggestions =
    lang === "id" ? DEFAULT_SUGGESTIONS_ID : DEFAULT_SUGGESTIONS_EN;
  const { isOpen, openChat, closeChat, pendingMessage, clearPending } = useChat();

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content:
        lang === "id"
          ? "Halo! Selamat datang di Arvion Creative. Saya Arvion Assistant, siap membantu Anda mendiskusikan kebutuhan UI/UX design, web development, atau branding proyek Anda."
          : "Hello! Welcome to Arvion Creative. I'm Arvion Assistant, ready to help you discuss UI/UX design, web development, or branding for your project.",
      quickReplies:
        lang === "id"
          ? ["Layanan apa saja yang ada?", "Estimasi waktu & biaya", "Bagaimana cara mulai proyek?"]
          : ["What services are available?", "Time & cost estimate", "How do I start a project?"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      if (data && data.reply) {
        const { cleanContent, quickReplies } = parseMessageContent(data.reply);
        setMessages([
          ...newMessages,
          {
            role: "model",
            content: cleanContent,
            quickReplies: quickReplies.length > 0 ? quickReplies : undefined,
          },
        ]);
      } else {
        setMessages([
          ...newMessages,
          {
            role: "model",
            content:
                lang === "id"
                  ? "Terima kasih atas pertanyaannya. Untuk respon langsung dan konsultasi cepat, Anda juga bisa langsung chat kami via WhatsApp."
                  : "Thank you for your question. For a direct response and quick consultation, you can also chat with us via WhatsApp.",
              quickReplies:
                lang === "id"
                  ? ["Chat WhatsApp Sekarang", "Lihat Layanan Arvion"]
                  : ["Chat on WhatsApp", "View Arvion Services"],
          },
        ]);
      }
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "model",
          content:
            lang === "id"
              ? "Koneksi terputus. Silakan coba kirim ulang atau hubungi kami langsung via WhatsApp untuk respon instan."
              : "Connection lost. Please try again or contact us directly via WhatsApp for an instant response.",
          quickReplies:
            lang === "id" ? ["Chat WhatsApp Sekarang"] : ["Chat on WhatsApp"],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (pendingMessage && isOpen) {
      clearPending();
      const timeoutId = window.setTimeout(() => {
        void handleSend(pendingMessage);
      }, 0);
      return () => window.clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingMessage, isOpen]);

  const handleWhatsAppAction = () => {
    const text = encodeURIComponent(
      lang === "id"
        ? "Halo Arvion Creative, saya sedang berkunjung ke website dan ingin konsultasi mengenai proyek digital saya."
        : "Hello Arvion Creative, I visited your website and would like to consult about my digital project."
    );
    window.open(`https://wa.me/${SITE_BRAND.phoneRaw}?text=${text}`, "_blank");
  };

  // Get active suggestions: latest message's quick replies or default suggestions
  const latestModelMessage = [...messages].reverse().find((m) => m.role === "model");
  const currentQuickReplies = latestModelMessage?.quickReplies && latestModelMessage.quickReplies.length > 0
    ? latestModelMessage.quickReplies
    : defaultSuggestions;

  return (
    <>
      {/* Scroll to Top floating button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-24 right-6 z-30 p-2.5 rounded-full bg-white border border-[#ECEEF1] text-[#171A22] shadow-md hover:border-[#F47721] hover:text-[#F47721] transition-all"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={isOpen ? closeChat : openChat}
          aria-label={isOpen ? (lang === "id" ? "Tutup chat AI" : "Close AI chat") : (lang === "id" ? "Buka chat Asisten Arvion" : "Open Arvion Assistant chat")}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-13 w-13 items-center justify-center rounded-full bg-[#171A22] text-white shadow-[0_6px_24px_rgba(23,26,34,0.35)] hover:bg-[#F47721] transition-all border border-slate-700 group"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <div className="relative">
              <MessageSquare className="w-5 h-5 text-white" />
              <span className="absolute -top-1.5 -right-1.5 w-2 h-2 rounded-full bg-[#F47721] ring-2 ring-[#171A22] animate-pulse" />
            </div>
          )}
        </motion.button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-22 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[390px] h-[540px] max-h-[82vh] bg-white rounded-2xl shadow-2xl border border-[#ECEEF1] flex flex-col overflow-hidden"
          >
            {/* Header: Charcoal with Orange accent */}
            <div className="bg-[#171A22] text-white p-4 flex items-center justify-between border-b border-slate-800 relative">
              {/* Top Accent Orange Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F47721] via-[#FF9B4A] to-[#F47721]" />

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F47721] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold flex items-center gap-1.5 text-white">
                    <span>Arvion Assistant</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#FF9B4A]" />
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{lang === "id" ? "Creative Studio AI • Online" : "Creative Studio AI • Online"}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Direct WhatsApp button in header */}
                <button
                  onClick={handleWhatsAppAction}
                  title={lang === "id" ? "Hubungi via WhatsApp" : "Contact via WhatsApp"}
                  className="p-1.5 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-600/30 transition-colors"
                  aria-label="Direct WhatsApp"
                >
                  <PhoneCall className="w-4 h-4" />
                </button>
                <button
                  onClick={closeChat}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close chat window"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Content */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FFFAF6]/60">
              {messages.map((msg, index) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-2.5 ${
                      isUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        isUser
                          ? "bg-[#171A22] text-[#F47721] border border-slate-700"
                          : "bg-[#F47721] text-white shadow-xs"
                      }`}
                    >
                      {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    <div
                      className={`max-w-[80%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isUser
                          ? "bg-[#F47721] text-white rounded-tr-xs shadow-xs font-medium"
                          : "bg-white text-[#171A22] border border-[#ECEEF1] rounded-tl-xs shadow-xs"
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.content}</div>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-[#707581] p-2.5 bg-white rounded-xl border border-[#ECEEF1] w-fit shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F47721] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F47721] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F47721] animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1 text-[11px] font-medium text-[#707581]">
                    {lang === "id" ? "Arvion sedang merespon..." : "Arvion is responding..."}
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Dynamic Quick Replies Pills */}
            <div className="px-3 py-2 bg-white border-t border-[#ECEEF1] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-bold text-[#707581] uppercase tracking-wider shrink-0 pl-1">
                {lang === "id" ? "Tanya:" : "Ask:"}
              </span>
              {currentQuickReplies.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (q.toLowerCase().includes("whatsapp")) {
                      handleWhatsAppAction();
                    } else {
                      handleSend(q);
                    }
                  }}
                  disabled={isLoading}
                  className="whitespace-nowrap text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#FFF3E9] text-[#F47721] hover:bg-[#F47721] hover:text-white border border-[#FFE2CC] transition-all shrink-0 disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 bg-white border-t border-[#ECEEF1] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === "id" ? "Tanyakan layanan atau proyek..." : "Ask about services or a project..."}
                disabled={isLoading}
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-[#FFFAF6] border border-[#ECEEF1] rounded-xl text-[#171A22] placeholder-slate-400 focus:outline-hidden focus:border-[#F47721] focus:bg-white transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="p-2.5 rounded-xl bg-[#F47721] text-white hover:bg-[#e06512] transition-colors disabled:opacity-50 shrink-0 shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
