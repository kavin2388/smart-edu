import React, { useState } from 'react';
import { UserProfile, ScreenView } from '../types';

interface HeaderProps {
  user: UserProfile;
  onNavigate: (view: ScreenView) => void;
  onToggleMobileMenu: () => void;
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onNavigate,
  onToggleMobileMenu,
  onSearch,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    { id: '1', title: 'New Skill Vector Assessment available', time: '10m ago', unread: true },
    { id: '2', title: "Dr. Elena replied in 'Leadership Fundamentals'", time: '1h ago', unread: true },
    { id: '3', title: "You earned the '3-Day Streak Master' badge", time: '1d ago', unread: false },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-20 bg-[#0d1322]/80 backdrop-blur-xl z-40 px-4 md:px-8 flex items-center justify-between border-b border-white/5 shadow-[0_1px_12px_rgba(0,0,0,0.3)]">
      {/* Mobile Hamburger & Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 text-[#ccc3d8] hover:text-white rounded-lg hover:bg-[#242a3a]"
          aria-label="Open menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <div className="relative flex items-center w-full">
          <span className="material-symbols-outlined absolute left-4 text-[#958da1] text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search courses, skills, resources..."
            className="w-full bg-[#080e1d] border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-[#dde2f8] placeholder:text-[#958da1]/60 focus:outline-none focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6]/40 transition-all text-[14px]"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                if (onSearch) onSearch('');
              }}
              className="absolute right-3 text-[#958da1] hover:text-white"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Screen Selector Dropdown */}
        <div className="relative hidden xl:flex items-center mr-2">
          <select
            onChange={(e) => onNavigate(e.target.value as ScreenView)}
            className="bg-[#151b2b] border border-white/10 text-xs text-[#acedff] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#7c3aed] cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled>Jump to Screen...</option>
            <option value="landing">1. Landing & Overview</option>
            <option value="signin">2. Sign In Screen</option>
            <option value="signup-step1">3. Step 1: Join Account</option>
            <option value="signup-step2">4. Step 2: Role Selection</option>
            <option value="signup-step3">5. Step 3: Profile Matrix</option>
            <option value="dashboard">6. Dashboard Hub</option>
            <option value="my-profile">7. Profile Matrix View</option>
            <option value="my-skills">8. My Skills & Proficiencies</option>
            <option value="learning-hub">9. Learning Hub & Courses</option>
            <option value="ai-coach">10. AI Coach Interaction</option>
            <option value="assessments">11. Assessments Diagnostic</option>
            <option value="knowledge-hub">12. Knowledge Hub</option>
            <option value="achievements">13. Badges & Milestones</option>
            <option value="settings">14. Settings</option>
          </select>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-full hover:bg-[#242a3a] text-[#ccc3d8] hover:text-white transition-colors relative"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#d2bbff] rounded-full shadow-[0_0_8px_#d2bbff]"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-[#191f2f] border border-white/10 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-2">
                <span className="font-display font-semibold text-[14px] text-white">Notifications</span>
                <span className="text-[11px] text-[#4cd7f6] bg-[#007184]/30 px-2 py-0.5 rounded-full">2 new</span>
              </div>
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                      n.unread ? 'bg-[#242a3a]/80 hover:bg-[#242a3a]' : 'hover:bg-[#151b2b]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-[#dde2f8] font-medium">
                      <span>{n.title}</span>
                      {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6]"></span>}
                    </div>
                    <span className="text-[11px] text-[#958da1]">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Help Tooltip/Modal */}
        <div className="relative">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-2.5 rounded-full hover:bg-[#242a3a] text-[#ccc3d8] hover:text-white transition-colors"
            title="Help & Guides"
          >
            <span className="material-symbols-outlined text-[22px]">help</span>
          </button>

          {showHelp && (
            <div className="absolute right-0 mt-3 w-72 bg-[#191f2f] border border-white/10 rounded-2xl shadow-2xl p-4 z-50">
              <span className="font-display font-semibold text-[14px] text-white block mb-2">Capacity Guide</span>
              <p className="text-xs text-[#ccc3d8] leading-relaxed mb-3">
                Capacity Connect maps your 8-dimensional competency matrix and guides your organizational learning progression.
              </p>
              <button
                onClick={() => {
                  setShowHelp(false);
                  onNavigate('ai-coach');
                }}
                className="w-full py-2 bg-[#7c3aed] text-white rounded-lg text-xs font-semibold hover:bg-[#6d28d9] transition-all"
              >
                Talk to AI Coach
              </button>
            </div>
          )}
        </div>

        <div className="h-8 w-[1px] bg-white/10 mx-1 hidden sm:block"></div>

        {/* User Profile Pill */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 pl-1 sm:pl-2 py-1 pr-2 rounded-xl hover:bg-[#242a3a] transition-all"
          >
            <div className="text-right hidden sm:block">
              <div className="text-[14px] font-semibold text-[#dde2f8] leading-tight">{user.name}</div>
              <div className="text-[11px] text-[#958da1]">{user.role || 'Product Designer'}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7c3aed] to-[#4cd7f6] p-[2px] shadow-[0_0_15px_rgba(210,187,255,0.3)]">
              <div className="w-full h-full rounded-full bg-[#191f2f] flex items-center justify-center text-[#d2bbff] font-bold text-sm">
                {user.name.split(' ').map(n => n[0]).join('') || 'K'}
              </div>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-[#191f2f] border border-white/10 rounded-2xl shadow-2xl p-2 z-50">
              <div className="px-3 py-2 border-b border-white/10 mb-1">
                <p className="text-sm font-semibold text-white">{user.name}</p>
                <p className="text-xs text-[#958da1] truncate">{user.email}</p>
              </div>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onNavigate('my-profile');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#ccc3d8] hover:text-white hover:bg-[#242a3a] rounded-lg"
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
                My Profile Matrix
              </button>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onNavigate('settings');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#ccc3d8] hover:text-white hover:bg-[#242a3a] rounded-lg"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
                Account Settings
              </button>
              <div className="border-t border-white/10 my-1"></div>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onNavigate('signin');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#ffb4ab] hover:bg-[#93000a]/20 rounded-lg"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
