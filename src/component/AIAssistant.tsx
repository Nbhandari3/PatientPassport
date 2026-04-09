import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, Activity, Heart, Stethoscope, Pill, AlertCircle, Loader2 } from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
};

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hi Alex! I'm your AI Health Assistant. I can help you understand your lab results, manage your medications, or answer general health questions based on your profile. How can I assist you today?",
    timestamp: new Date(),
    suggestions: [
      "What do my recent cholesterol levels mean?",
      "When should I take my Lisinopril?",
      "I'm feeling dizzy, what should I do?"
    ]
  }
];

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let responseContent = "I understand. Based on your health profile, I recommend discussing this with Dr. Jenkins during your next visit.";
      let suggestions: string[] | undefined = undefined;

      if (text.toLowerCase().includes('cholesterol')) {
        responseContent = "Your recent lab results show your LDL cholesterol is 110 mg/dL, which is slightly above the optimal range (<100 mg/dL), but your HDL (good cholesterol) is excellent at 65 mg/dL. Your doctor has prescribed Atorvastatin to help manage this. Are you taking it regularly?";
        suggestions = ["Yes, every night", "I missed a few doses", "What foods should I avoid?"];
      } else if (text.toLowerCase().includes('lisinopril')) {
        responseContent = "You should take your Lisinopril (10mg) once daily in the morning, preferably with food to avoid stomach upset. It's important to take it at the same time every day to maintain steady blood pressure.";
        suggestions = ["What if I miss a dose?", "Can I drink coffee with it?"];
      } else if (text.toLowerCase().includes('dizzy')) {
        responseContent = "Dizziness can be a side effect of Lisinopril, especially when standing up quickly. However, if it's severe or accompanied by chest pain or shortness of breath, you should seek immediate medical attention. How long have you been feeling dizzy?";
        suggestions = ["Just started today", "It happens when I stand up", "Show my Emergency Card"];
      }

      const newAssistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
        suggestions
      };

      setMessages(prev => [...prev, newAssistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0ECFB4] to-[#7C6FF7] flex items-center justify-center text-white shadow-md shadow-teal-500/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">Health Assistant</h2>
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Online
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <Activity className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/50">
        {/* Context Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-start gap-3 text-sm text-blue-800 mx-auto max-w-2xl">
          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Context Active:</strong> The assistant has access to your latest lab results (Oct 15), current medications, and profile (Low Risk, O+).
          </p>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                msg.role === 'user' 
                  ? 'bg-slate-200 text-slate-600' 
                  : 'bg-gradient-to-br from-[#0ECFB4] to-[#7C6FF7] text-white shadow-sm'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Sparkles className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className="flex flex-col gap-1">
                <div className={`px-4 py-3 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-sm'
                    : 'bg-white border border-slate-100 text-slate-800 shadow-sm rounded-tl-sm'
                }`}>
                  <p className="text-[15px] leading-relaxed">{msg.content}</p>
                </div>
                
                <span className={`text-xs text-slate-400 font-medium px-1 ${
                  msg.role === 'user' ? 'text-right' : 'text-left'
                }`}>
                  {formatTime(msg.timestamp)}
                </span>

                {/* Suggestions */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {msg.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(suggestion)}
                        className="px-3 py-1.5 bg-white border border-teal-100 text-teal-700 rounded-full text-sm font-medium hover:bg-teal-50 hover:border-teal-200 transition-colors shadow-sm"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[85%] flex-row">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0ECFB4] to-[#7C6FF7] text-white shadow-sm flex items-center justify-center flex-shrink-0 mt-1">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex items-end gap-2 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask about your health, medications, or lab results..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none min-h-[52px] max-h-[120px]"
              rows={1}
            />
            <div className="absolute right-3 bottom-3 flex items-center gap-2">
              <button className="text-slate-400 hover:text-teal-500 transition-colors">
                <Stethoscope className="w-5 h-5" />
              </button>
            </div>
          </div>
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="p-3.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0 shadow-sm"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center mt-2">
          <p className="text-[11px] text-slate-400 font-medium">
            AI Assistant provides general information based on your profile. Always consult your doctor for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
