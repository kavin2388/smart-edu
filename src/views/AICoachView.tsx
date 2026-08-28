import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, ScreenView } from '../types';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  recommendations?: { title: string; category: string; duration: string }[];
}

interface AICoachViewProps {
  user: UserProfile;
  onNavigate: (view: ScreenView) => void;
}

export const AICoachView: React.FC<AICoachViewProps> = ({ user, onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello ${user.name.split(' ')[0]}! I am your AI Capacity Coach. I've analyzed your 8-dimensional competency matrix (current score: 78/100) and your career objective of transitioning into Engineering Management. How can I help accelerate your learning trajectory today?`,
      timestamp: 'Just now',
      recommendations: [
        { title: 'Leadership Fundamentals for New Managers', category: 'Leadership', duration: '4h 30m' },
        { title: 'Effective Communication in Remote Teams', category: 'Soft Skills', duration: '3h 15m' },
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Analyze my skill gaps for Engineering Management',
    'Generate a 30-day accelerated learning schedule',
    'How do I improve my Cross-Functional Communication vector?',
    'What diagnostic assessment should I take next?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: messageText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = '';
      let recs: { title: string; category: string; duration: string }[] | undefined = undefined;

      const lower = messageText.toLowerCase();
      if (lower.includes('gap') || lower.includes('matrix') || lower.includes('management')) {
        aiResponseText = `Based on your profile matrix:\n\n1. **Strongest Vectors**: Technology & Cloud Architecture (88%), Agile Execution (85%).\n2. **Target Growth Vectors**: Engineering Leadership (72%) and Cross-Functional Communication (68%).\n\nTo bridge this gap over the next 6 weeks, I recommend focusing on "The Mindset Shift: From Maker to Multiplier" and delegating critical system paths.`;
        recs = [
          { title: 'Leadership Fundamentals for New Managers', category: 'Leadership', duration: '4h 30m' },
          { title: 'Executive Leadership & Conflict Benchmark', category: 'Assessment', duration: '20 min' },
        ];
      } else if (lower.includes('schedule') || lower.includes('30-day') || lower.includes('plan')) {
        aiResponseText = `Here is your customized 30-Day Capacity Sprint:\n\n• **Week 1-2**: Complete Module 3 & 4 of Leadership Fundamentals (2.5 hrs/week).\n• **Week 3**: Take the Executive Leadership Benchmark Diagnostic to calibrate your leadership vector.\n• **Week 4**: Apply async feedback frameworks on your current team sprints and log key case insights in the Knowledge Hub.`;
      } else if (lower.includes('assessment') || lower.includes('benchmark')) {
        aiResponseText = `Your next high-value diagnostic is the **Executive Leadership & Conflict Benchmark**. It validates scenario decision-making across high-stakes team transitions.`;
        recs = [
          { title: 'Executive Leadership & Conflict Benchmark', category: 'Assessment', duration: '20 min' },
        ];
      } else {
        aiResponseText = `Great question! To optimize your learning capacity in this area, you should balance theoretical frameworks with live scenario diagnostics. Would you like me to recommend specific micro-modules or generate a practice assessment?`;
      }

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendations: recs,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-h-[850px] bg-[#191f2f]/80 backdrop-blur-md rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
      {/* Coach Header */}
      <div className="p-4 md:p-6 border-b border-white/10 bg-[#151b2b] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7c3aed] to-[#4cd7f6] p-[2px] shadow-[0_0_15px_rgba(124,58,237,0.4)]">
            <div className="w-full h-full rounded-[10px] bg-[#0d1322] flex items-center justify-center text-[#acedff]">
              <span className="material-symbols-outlined text-[22px]">psychology</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-bold text-white text-base">AI Capacity Coach</h2>
              <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
            </div>
            <p className="text-xs text-[#958da1]">Active Diagnostic Engine • 8D Matrix Calibrated</p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('my-profile')}
          className="text-xs text-[#d2bbff] hover:text-white flex items-center gap-1 font-semibold"
        >
          <span>View Matrix</span>
          <span className="material-symbols-outlined text-sm">north_east</span>
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-xl rounded-2xl p-4 text-xs md:text-sm leading-relaxed shadow-lg ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-[#7c3aed] to-[#0053db] text-white rounded-br-none'
                  : 'bg-[#151b2b] text-[#dde2f8] border border-white/10 rounded-bl-none'
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>

              {/* Actionable recommendations card */}
              {msg.recommendations && msg.recommendations.length > 0 && (
                <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                  <span className="text-[11px] font-bold text-[#4cd7f6] uppercase tracking-wider block">
                    Recommended Actions:
                  </span>
                  {msg.recommendations.map((rec, i) => (
                    <div
                      key={i}
                      onClick={() => onNavigate('learning-hub')}
                      className="p-2.5 rounded-xl bg-[#0d1322] hover:bg-[#242a3a] border border-white/5 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div>
                        <p className="text-xs font-semibold text-white">{rec.title}</p>
                        <p className="text-[10px] text-[#958da1]">{rec.category} • {rec.duration}</p>
                      </div>
                      <span className="material-symbols-outlined text-[#4cd7f6] text-[16px]">play_circle</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <span className="text-[10px] text-[#958da1] mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 p-3 bg-[#151b2b] rounded-2xl rounded-bl-none max-w-xs border border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-bounce"></span>
            <span className="w-2 h-2 rounded-full bg-[#7c3aed] animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-2 h-2 rounded-full bg-[#acedff] animate-bounce [animation-delay:0.4s]"></span>
            <span className="text-xs text-[#958da1] ml-1">Analyzing capacity data...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 md:px-6 py-2 bg-[#151b2b]/50 border-t border-white/5 flex gap-2 overflow-x-auto">
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p)}
            className="px-3 py-1.5 rounded-full bg-[#191f2f] hover:bg-[#242a3a] border border-white/10 text-[11px] text-[#ccc3d8] hover:text-white whitespace-nowrap transition-all"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-white/10 bg-[#151b2b]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your coach anything about skills, gaps, or study strategies..."
            className="flex-1 bg-[#0d1322] border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm text-white placeholder-[#958da1] focus:outline-none focus:border-[#4cd7f6]"
          />
          <button
            type="submit"
            className="px-5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl font-semibold text-xs flex items-center justify-center transition-all shadow-[0_0_15px_rgba(124,58,237,0.3)]"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
