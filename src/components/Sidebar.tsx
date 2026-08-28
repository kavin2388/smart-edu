import React from 'react';
import { ScreenView } from '../types';

interface SidebarProps {
  currentView: ScreenView;
  onNavigate: (view: ScreenView) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'my-profile', label: 'My Profile', icon: 'person' },
    { id: 'my-skills', label: 'My Skills', icon: 'history_edu' },
    { id: 'learning-hub', label: 'Learning Hub', icon: 'school' },
    { id: 'ai-coach', label: 'AI Coach', icon: 'psychology' },
    { id: 'assessments', label: 'Assessments', icon: 'award_star' },
    { id: 'knowledge-hub', label: 'Knowledge Hub', icon: 'workspace_premium' },
    { id: 'achievements', label: 'Achievements', icon: 'emoji_events' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-[#151b2b]/90 lg:bg-[#151b2b]/70 backdrop-blur-2xl z-50 flex flex-col border-r border-white/5 shadow-2xl transition-transform duration-300 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-8 border-b border-white/5">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#0053db] p-[1px] shadow-[0_0_15px_rgba(124,58,237,0.4)] flex items-center justify-center">
              <div className="w-full h-full bg-[#0d1322] rounded-[11px] flex items-center justify-center group-hover:bg-[#191f2f] transition-colors">
                <span className="material-symbols-outlined text-[#acedff] text-[20px] fill">hexagon</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-[18px] tracking-tight text-[#dde2f8]">
                CAPACITY
              </span>
              <span className="text-[10px] tracking-widest text-[#4cd7f6] uppercase font-semibold -mt-1">
                CONNECT
              </span>
            </div>
          </button>

          {/* Close button for mobile */}
          <button
            className="lg:hidden p-1 text-[#ccc3d8] hover:text-white"
            onClick={onCloseMobile}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id as ScreenView);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all font-medium text-[14px] text-left group relative ${
                  isActive
                    ? 'bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] font-semibold'
                    : 'text-[#ccc3d8] hover:bg-[#242a3a] hover:text-[#dde2f8]'
                }`}
              >
                <span
                  className={`material-symbols-outlined mr-3 text-[20px] transition-transform duration-200 ${
                    isActive ? 'fill scale-110 text-white' : 'group-hover:scale-110 text-[#ccc3d8] group-hover:text-white'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="flex-1 tracking-wide">{item.label}</span>
                {item.id === 'ai-coach' && (
                  <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-[#4cd7f6]/20 text-[#acedff] border border-[#4cd7f6]/30 font-semibold tracking-wider">
                    AI
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions: Settings & Logout */}
        <div className="px-4 py-6 border-t border-white/5 space-y-1 bg-[#0d1322]/40">
          <button
            onClick={() => {
              onNavigate('settings');
              if (onCloseMobile) onCloseMobile();
            }}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all font-medium text-[14px] text-left group ${
              currentView === 'settings'
                ? 'bg-[#7c3aed] text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                : 'text-[#ccc3d8] hover:bg-[#242a3a] hover:text-[#dde2f8]'
            }`}
          >
            <span className="material-symbols-outlined mr-3 text-[20px] group-hover:rotate-45 transition-transform">
              settings
            </span>
            <span>Settings</span>
          </button>

          <button
            onClick={() => {
              onNavigate('signin');
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center px-4 py-3 rounded-xl text-[#ffb4ab] hover:bg-[#93000a]/20 transition-all font-medium text-[14px] text-left group"
          >
            <span className="material-symbols-outlined mr-3 text-[20px] group-hover:-translate-x-0.5 transition-transform">
              logout
            </span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
