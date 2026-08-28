import React from 'react';
import { AchievementItem, ScreenView } from '../types';

interface AchievementsViewProps {
  achievements: AchievementItem[];
  onNavigate: (view: ScreenView) => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  achievements,
  onNavigate,
}) => {
  const leaderboard = [
    { rank: 1, name: 'Kavin Felix', score: 1420, streak: '3 days', badge: 'Diamond' },
    { rank: 2, name: 'Maya Lin', score: 1380, streak: '5 days', badge: 'Gold' },
    { rank: 3, name: 'Tomas Novak', score: 1290, streak: '2 days', badge: 'Gold' },
    { rank: 4, name: 'Priya Sharma', score: 1150, streak: '4 days', badge: 'Silver' },
    { rank: 5, name: 'David Vance', score: 1040, streak: '1 day', badge: 'Silver' },
  ];

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white">
            Badges & Capacity Milestones
          </h1>
          <p className="text-xs md:text-sm text-[#ccc3d8]">
            Celebrate your verified competency milestones and learning velocity.
          </p>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="px-4 py-2.5 rounded-xl bg-[#191f2f] hover:bg-[#242a3a] border border-white/10 text-xs font-semibold text-[#dde2f8] flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">dashboard</span>
          Back to Dashboard
        </button>
      </div>

      {/* Grid: Badges (8 cols) + Leaderboard (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Badges List (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <h2 className="text-base font-bold font-display text-white">Unlocked Badges ({achievements.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className="bg-[#191f2f]/80 backdrop-blur-md rounded-2xl p-5 border border-white/5 shadow-xl flex items-start gap-4 hover:border-white/20 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7c3aed] to-[#4cd7f6] p-[2px] shadow-[0_0_20px_rgba(124,58,237,0.3)] shrink-0">
                  <div className="w-full h-full rounded-[14px] bg-[#0d1322] flex items-center justify-center text-[#d2bbff] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[28px] fill">{ach.icon}</span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-white text-sm truncate">{ach.title}</h3>
                    <span className="text-[10px] font-bold text-[#acedff] bg-[#007184]/30 px-2 py-0.5 rounded-full">
                      {ach.tier}
                    </span>
                  </div>
                  <p className="text-xs text-[#ccc3d8] mt-1 line-clamp-2">{ach.description}</p>
                  <p className="text-[10px] text-[#958da1] mt-2">Unlocked {ach.unlockedAt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard (4 cols) */}
        <div className="lg:col-span-4 bg-[#191f2f]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-white text-base flex items-center gap-2">
                <span className="material-symbols-outlined text-[#acedff] fill">leaderboard</span>
                Cohort Leaderboard
              </h2>
              <span className="text-xs text-[#4cd7f6] font-semibold">Q3 Velocity</span>
            </div>

            <div className="space-y-3">
              {leaderboard.map((user, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl flex items-center justify-between text-xs transition-colors ${
                    idx === 0
                      ? 'bg-[#7c3aed]/20 border border-[#7c3aed]/40 text-white shadow-sm'
                      : 'bg-[#151b2b] text-[#dde2f8]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-5 font-bold ${idx === 0 ? 'text-[#d2bbff]' : 'text-[#958da1]'}`}>
                      #{user.rank}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{user.name}</p>
                      <p className="text-[10px] text-[#958da1]">{user.streak} streak</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#acedff]">{user.score} pts</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 mt-6 text-center">
            <span className="text-xs text-[#958da1]">Points refresh daily at 00:00 UTC</span>
          </div>
        </div>
      </div>
    </div>
  );
};
