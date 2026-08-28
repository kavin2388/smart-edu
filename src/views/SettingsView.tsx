import React, { useState } from 'react';
import { UserProfile, ScreenView } from '../types';

interface SettingsViewProps {
  user: UserProfile;
  onUpdateUser: (updates: Partial<UserProfile>) => void;
  onNavigate: (view: ScreenView) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  onUpdateUser,
  onNavigate,
}) => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [aiTips, setAiTips] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col gap-8 pb-12 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white">
            Account & System Settings
          </h1>
          <p className="text-xs md:text-sm text-[#ccc3d8]">
            Configure platform preferences, notification triggers, and enterprise security.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 bg-[#007184]/30 border border-[#4cd7f6]/40 rounded-xl text-xs text-[#acedff] font-semibold flex items-center gap-1.5 animate-in fade-in">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            Preferences Saved!
          </div>
        )}
      </div>

      {/* Notifications Section */}
      <div className="bg-[#191f2f]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl space-y-4">
        <h2 className="text-base font-bold font-display text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[#d2bbff]">notifications</span>
          Notification Triggers
        </h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#151b2b]">
            <div>
              <p className="text-xs font-semibold text-white">AI Coach Learning Recommendations</p>
              <p className="text-[11px] text-[#958da1]">Receive proactive micro-path recommendations based on your capacity vector.</p>
            </div>
            <input
              type="checkbox"
              checked={aiTips}
              onChange={(e) => setAiTips(e.target.checked)}
              className="w-4 h-4 rounded bg-[#0d1322] border-white/20 text-[#7c3aed]"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#151b2b]">
            <div>
              <p className="text-xs font-semibold text-white">Weekly Capacity Digest</p>
              <p className="text-[11px] text-[#958da1]">Get a high-signal report on team velocity and individual milestones every Monday.</p>
            </div>
            <input
              type="checkbox"
              checked={weeklyDigest}
              onChange={(e) => setWeeklyDigest(e.target.checked)}
              className="w-4 h-4 rounded bg-[#0d1322] border-white/20 text-[#7c3aed]"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#151b2b]">
            <div>
              <p className="text-xs font-semibold text-white">Assessment Benchmark Alerts</p>
              <p className="text-[11px] text-[#958da1]">Notify when new empirical skill verification scenarios are available.</p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 rounded bg-[#0d1322] border-white/20 text-[#7c3aed]"
            />
          </div>
        </div>
      </div>

      {/* Security & Organization */}
      <div className="bg-[#191f2f]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl space-y-4">
        <h2 className="text-base font-bold font-display text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[#4cd7f6]">security</span>
          Enterprise Authentication & Security
        </h2>

        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-[#151b2b] flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-white">Single Sign-On (SSO / SAML)</p>
              <p className="text-[11px] text-[#958da1]">Connected via Google Enterprise Workspace (Active)</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#007184]/30 text-[#acedff] border border-[#4cd7f6]/30">
              Enabled
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#151b2b] flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-white">Current Organization</p>
              <p className="text-[11px] text-[#958da1]">{user.organization} • {user.department}</p>
            </div>
            <button
              onClick={() => onNavigate('my-profile')}
              className="text-xs text-[#d2bbff] hover:underline font-semibold"
            >
              Change
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="px-6 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-semibold shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
