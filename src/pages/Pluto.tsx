import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, ArrowUp02Icon } from "@hugeicons/core-free-icons";
import { twMerge } from "tailwind-merge";

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
};

const DUMMY_MESSAGES: Message[] = [
  {
    id: "1",
    sender: "ai",
    text: "Hi there! I'm Pluto, your personal financial assistant. How can I help you optimize your Vaultly subscriptions today?",
  },
  {
    id: "2",
    sender: "user",
    text: "Can you tell me how much I'm spending on entertainment?",
  },
  {
    id: "3",
    sender: "ai",
    text: "You are currently spending ₹1,450 per month on Entertainment subscriptions (like Netflix and Spotify). This makes up 45% of your total budget. Would you like me to find some ways to reduce this?",
  },
];

function Pluto() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(DUMMY_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue.trim(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Simulate AI typing response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "I'm just a dummy template for now! Once you wire me up to an LLM, I'll be able to give you a real answer.",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 text-light fade-in pb-20">
      {/* Header */}
      <section className="flex items-start gap-4 shrink-0">
        <div className="cursor-pointer mt-1" onClick={() => navigate("/")}>
          <HugeiconsIcon
            icon={ArrowLeft02Icon}
            className="text-accent w-8 h-8"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="h3 leading-tight">Pluto</h1>
          <p className="text-accent-bg uppercase p">Your AI Assistant</p>
        </div>
      </section>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 no-scrollbar">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={twMerge(
                "max-w-[85%] rounded-[20px] p-4 text-sm leading-relaxed",
                isUser
                  ? "self-end bg-accent text-[#1A1A1A] font-medium rounded-br-sm shadow-sm"
                  : "self-start bg-dark-accent text-light rounded-bl-sm shadow-sm",
              )}
            >
              {msg.text}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-28 left-0 right-0 px-8 pb-4 bg-dark/80 backdrop-blur-md z-10">
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 bg-dark-accent border border-[rgba(255,255,255,0.1)] rounded-[20px] p-2 pr-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Pluto anything..."
            className="flex-1 bg-transparent border-none outline-none text-light placeholder-accent-bg text-sm px-4 py-2"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="bg-accent text-[#1A1A1A] w-10 h-10 rounded-full flex items-center justify-center shrink-0 disabled:opacity-30 disabled:bg-accent/50 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <HugeiconsIcon icon={ArrowUp02Icon} className="w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Pluto;
