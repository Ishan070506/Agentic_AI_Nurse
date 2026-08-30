import React, { useState, useRef, useEffect } from 'react';
import { useHealth } from '../context/HealthContext';
import { useAuth } from '../context/AuthContext';
import { Bot, Send, User, Stethoscope, Sparkles, AlertCircle, Heart, ArrowRight } from 'lucide-react';

export const ChatPage: React.FC = () => {
  const { chatMessages, sendChatMessage, openVitalsModal } = useHealth();
  const { role, user } = useAuth();
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState<'ai' | 'doctor'>('ai');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const senderRole = role === 'doctor' ? 'doctor' : 'user';
    sendChatMessage(input.trim(), senderRole);
    setInput('');
  };

  const quickPrompts = [
    "Analyze my latest blood pressure reading",
    "Should I adjust my glucose intake after dinner?",
    "When is my next appointment with Dr. Jenkins?",
    "Log a symptom: Mild headache"
  ];

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary-600 to-teal-400 flex items-center justify-center font-bold text-white shadow-md">
            {activeTab === 'ai' ? <Bot className="w-5 h-5 text-white" /> : <Stethoscope className="w-5 h-5 text-white" />}
          </div>
          <div>
            <h2 className="font-bold text-sm flex items-center gap-2">
              {activeTab === 'ai' ? 'CareMate AI Nurse Agent' : 'Dr. Sarah Jenkins'}
              {activeTab === 'ai' && (
                <span className="text-[10px] bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-full">
                  Agentic Intelligence
                </span>
              )}
            </h2>
            <p className="text-[10px] text-slate-400">
              {activeTab === 'ai' ? 'Real-time Vitals Triage & Health Guidance' : 'Primary Care Cardiologist & Endocrinologist'}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'ai' ? 'bg-primary-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            AI Nurse
          </button>
          <button
            onClick={() => setActiveTab('doctor')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'doctor' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Doctor Chat
          </button>
        </div>
      </div>

      {/* Quick Prompts Carousel */}
      {activeTab === 'ai' && (
        <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex items-center space-x-2 overflow-x-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 pl-2">Suggestions:</span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => sendChatMessage(prompt, 'user')}
              className="px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 hover:border-primary-400 hover:text-primary-600 shrink-0 transition-all shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
        {chatMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isAi = msg.sender === 'ai';

          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 max-w-2xl ${
                isUser ? 'ml-auto flex-row-reverse space-x-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                isUser ? 'bg-slate-800 text-white' :
                isAi ? 'bg-gradient-to-tr from-primary-600 to-teal-500 text-white' :
                'bg-teal-700 text-white'
              }`}>
                {isUser ? <User className="w-4 h-4" /> :
                 isAi ? <Bot className="w-4 h-4" /> :
                 <Stethoscope className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className={`space-y-1.5 p-4 rounded-2xl text-xs leading-relaxed ${
                isUser
                  ? 'bg-slate-900 text-white rounded-tr-none'
                  : isAi
                  ? 'bg-white border border-slate-200 text-slate-800 shadow-sm rounded-tl-none'
                  : 'bg-teal-50 border border-teal-200 text-teal-900 rounded-tl-none'
              }`}>
                <div className="flex items-center justify-between space-x-4">
                  <span className="font-bold opacity-75">
                    {isUser ? 'You' : isAi ? 'CareMate AI Nurse' : 'Dr. Sarah Jenkins'}
                  </span>
                  <span className="text-[9px] opacity-50">{msg.timestamp}</span>
                </div>
                <p>{msg.text}</p>

                {msg.recommendedAction && (
                  <div className="pt-2 border-t border-slate-100 mt-2">
                    <button
                      onClick={openVitalsModal}
                      className="px-2.5 py-1 rounded-lg bg-primary-50 text-primary-700 font-bold text-[10px] hover:bg-primary-100 transition-colors inline-flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{msg.recommendedAction}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={activeTab === 'ai' ? "Ask CareMate AI Nurse about vitals, symptoms, or medications..." : "Type message to Dr. Sarah Jenkins..."}
          className="flex-1 px-4 py-2.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-primary-500 outline-none"
        />
        <button
          type="submit"
          className="p-2.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs shadow-md shadow-primary-500/20 transition-all shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
