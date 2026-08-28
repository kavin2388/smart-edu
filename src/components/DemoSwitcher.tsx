import React, { useState } from 'react';
import { ScreenView } from '../types';

interface DemoSwitcherProps {
  currentView: ScreenView;
  onNavigate: (view: ScreenView) => void;
}

export const DemoSwitcher: React.FC<DemoSwitcherProps> = ({
  currentView,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const screens: { id: ScreenView; label: string; badge?: string }[] = [
    { id: 'landing', label: '1. Landing Page', badge: 'Hero' },
    { id: 'signin', label: '2. Sign In Screen', badge: 'Login' },
    { id: 'signup-step1', label: '3. Step 1: Join Account', badge: 'Form' },
    { id: 'signup-step2', label: '4. Step 2: Role Select', badge: 'Roles' },
    { id: 'signup-step3', label: '5. Step 3: Profile Matrix', badge: 'Radar' },
    { id: 'dashboard', label: '6. Main Dashboard', badge: 'Core' },
    { id: 'my-profile', label: '7. Profile Vector Matrix' },
    { id: 'my-skills', label: '8. Skills & Proficiencies' },
    { id: 'learning-hub', label: '9. Learning Hub & Courses' },
    { id: 'ai-coach', label: '10. AI Capacity Coach', badge: 'AI' },
    { id: 'assessments', label: '11. Skill Diagnostics' },
    { id: 'knowledge-hub', label: '12. Knowledge Hub' },
    { id: 'achievements', label: '13. Badges & Leaderboard' },
    { id: 'settings', label: '14. Settings' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-[#151b2b]/95 border border-white/15 backdrop-blur-2xl rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] p-3 mb-3 w-72 max-h-[460px] overflow-y-auto animate-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 px-2">
            <span className="text-xs font-bold font-display text-white">Capacity Screen Switcher</span>
            <span className="text-[10px] text-[#4cd7f6] bg-[#007184]/30 px-1.5 py-0.5 rounded">
              {screens.length} Screens
            </span>
          </div>

          <div className="space-y-1">
            {screens.map((screen) => {
              const isActive = currentView === screen.id;
              return (
                <button
                  key={screen.id}
                  onClick={() => {
                    onNavigate(screen.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all ${
                    isActive
                      ? 'bg-[#7c3aed] text-white font-semibold shadow-md'
                      : 'text-[#ccc3d8] hover:bg-[#242a3a] hover:text-white'
                  }`}
                >
                  <span className="truncate">{screen.label}</span>
                  {screen.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#191f2f] text-[#acedff] border border-white/10'
                      }`}
                    >
                      {screen.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gradient-to-r from-[#7c3aed] to-[#0053db] hover:from-[#6d28d9] hover:to-[#0047bd] text-white font-semibold text-xs px-4 py-2.5 rounded-full shadow-[0_0_25px_rgba(124,58,237,0.5)] border border-white/20 transition-all hover:scale-105"
      >
        <span className="material-symbols-outlined text-[18px] fill">layers</span>
        <span>{isOpen ? 'Close Switcher' : 'Switch Screens'}</span>
      </button>
    </div>
  );
};
