"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const WELCOME_MESSAGE = `👋 Welcome to LS Global Traders!

I'm your virtual assistant, here to help you with:
• Product information & sourcing
• Export services & pricing inquiries
• Become a buyer or supplier
• Request for Quotation (RFQ)
• General business inquiries

How can I assist you today?`;

export function Chatbot() {
  const t = useTranslations("chatbot");
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-open chatbot after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }].slice(-10),
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t("error") },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Welcome Popup */}
      {showWelcome && !isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-3 sm:right-4 left-3 sm:left-auto z-50 animate-bounce-in">
          <div className="bg-white rounded-lg shadow-xl p-3 sm:p-4 sm:max-w-xs border border-gray-200">
            <button
              onClick={() => setShowWelcome(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3">
              <div className="relative w-12 h-12 shrink-0">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-[#D28E45] to-[#C07D35] rounded-full flex items-center justify-center shadow-md animate-avatar-bounce">
                  <svg viewBox="0 0 36 36" className="w-8 h-8">
                    {/* Face */}
                    <circle cx="18" cy="14" r="10" fill="#FFDBB4"/>
                    {/* Hair with animation */}
                    <path className="animate-hair" d="M8 12c0-6 4-10 10-10s10 4 10 10c0 2-1 3-2 4 0-5-3-8-8-8s-8 3-8 8c-1-1-2-2-2-4z" fill="#4A3728"/>
                    {/* Left Eye with blink */}
                    <g className="animate-blink">
                      <circle cx="14" cy="13" r="1.5" fill="#333"/>
                      <circle cx="14" cy="12.5" r="0.5" fill="#fff"/>
                    </g>
                    {/* Right Eye with blink */}
                    <g className="animate-blink">
                      <circle cx="22" cy="13" r="1.5" fill="#333"/>
                      <circle cx="22" cy="12.5" r="0.5" fill="#fff"/>
                    </g>
                    {/* Animated Smile */}
                    <path className="animate-smile" d="M14 17c2 3 6 3 8 0" stroke="#333" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                    {/* Cheeks */}
                    <circle cx="11" cy="16" r="1.5" fill="#FFB6C1" opacity="0.6"/>
                    <circle cx="25" cy="16" r="1.5" fill="#FFB6C1" opacity="0.6"/>
                    {/* Body */}
                    <path d="M8 36v-8c0-4 4-6 10-6s10 2 10 6v8" fill="#D28E45"/>
                  </svg>
                </div>
                {/* Waving Hand */}
                <div className="absolute -right-1 -top-1 text-xl animate-wave">
                  👋
                </div>
              </div>
              <div>
                <p className="font-semibold text-[#313639] text-sm">
                  {t("welcomeTitle").replace("👋", "").trim()}
                </p>
                <p className="text-gray-600 text-xs mt-1">{t("welcomeText")}</p>
                <button
                  onClick={() => {
                    setIsOpen(true);
                    setShowWelcome(false);
                  }}
                  className="mt-2 text-sm text-[#D28E45] font-medium hover:underline"
                >
                  {t("startChat")} →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button - Hidden on mobile when chat is open */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowWelcome(false);
        }}
        className={`fixed bottom-4 right-4 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-[#D28E45] rounded-full shadow-lg flex items-center justify-center hover:bg-[#C07D35] transition-all ${isOpen ? 'max-sm:hidden' : ''}`}
        aria-label="Chat with us"
      >
        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        ) : (
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        )}
      </button>

      {/* Chat Window - Full screen on mobile, positioned on tablet/desktop */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-4 z-50 w-full sm:w-[380px] md:w-[420px] h-full sm:h-[520px] md:h-[560px] sm:max-h-[80vh] bg-white sm:rounded-lg shadow-2xl flex flex-col overflow-hidden sm:border border-gray-200">
          {/* Header */}
          <div className="bg-[#313639] px-4 py-3 sm:py-3 flex items-center gap-3 safe-area-top">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#D28E45] rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-sm">{t("title")}</h3>
              <p className="text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-400">{t("subtitle")}</span>
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1"
              aria-label="Close chat"
            >
              <X className="w-5 h-5 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "user" ? "bg-[#313639]" : "bg-[#D28E45]"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  ) : (
                    <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] sm:max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-[#313639] text-white"
                      : "bg-white text-gray-700 border border-gray-200"
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#D28E45] rounded-full flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-3 py-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-3 border-t border-gray-200 bg-white safe-area-bottom">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t("placeholder")}
                className="flex-1 border border-gray-200 rounded-full px-4 py-2.5 sm:py-2 text-sm focus:outline-none focus:border-[#D28E45] focus:ring-1 focus:ring-[#D28E45]/20"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 sm:w-10 sm:h-10 bg-[#D28E45] rounded-full flex items-center justify-center hover:bg-[#C07D35] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2 hidden sm:block">{t("poweredBy")}</p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(20px);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
        @keyframes wave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-wave {
          animation: wave 2s infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }
        @keyframes avatar-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-avatar-bounce {
          animation: avatar-bounce 1.5s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        .animate-blink {
          animation: blink 3s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes smile {
          0%, 100% { d: path("M14 17c2 3 6 3 8 0"); }
          50% { d: path("M14 18c2 2 6 2 8 0"); }
        }
        .animate-smile {
          animation: smile 2s ease-in-out infinite;
        }
        @keyframes hair {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-0.5px) rotate(0.5deg); }
          75% { transform: translateY(0.5px) rotate(-0.5deg); }
        }
        .animate-hair {
          animation: hair 2s ease-in-out infinite;
          transform-origin: center bottom;
        }
        /* Safe area for mobile devices with notches */
        .safe-area-top {
          padding-top: max(0.75rem, env(safe-area-inset-top));
        }
        .safe-area-bottom {
          padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
        }
        /* Smooth scrolling for messages */
        @media (max-width: 640px) {
          .overflow-y-auto {
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </>
  );
}
