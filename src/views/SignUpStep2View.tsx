import React, { useState } from 'react';
import { ScreenView, UserProfile, RoleType } from '../types';

interface SignUpStep2ViewProps {
  onNavigate: (view: ScreenView) => void;
  user: UserProfile;
  onUpdateUser: (updates: Partial<UserProfile>) => void;
}

export const SignUpStep2View: React.FC<SignUpStep2ViewProps> = ({
  onNavigate,
  user,
  onUpdateUser,
}) => {
  const [selectedRole, setSelectedRole] = useState<RoleType>(user.userType || 'learner');

  const handleSelectRole = (role: RoleType) => {
    setSelectedRole(role);
    onUpdateUser({ userType: role });
    setTimeout(() => {
      onNavigate('signup-step3');
    }, 200);
  };

  const roles = [
    {
      id: 'learner' as RoleType,
      title: 'Learner',
      description: 'Build new skills, access learning resources, and track your progress across multiple disciplines.',
      icon: 'school',
      accentColor: 'primary',
      borderColor: 'border-[#7c3aed]/50',
      glowColor: 'group-hover:shadow-[inset_0_0_30px_rgba(210,187,255,0.15)]',
      iconBg: 'group-hover:bg-[#7c3aed]/20 group-hover:text-[#d2bbff]',
      btnColor: 'text-[#d2bbff]',
      borderActive: 'border-[#7c3aed] ring-2 ring-[#7c3aed]/50 shadow-[0_0_30px_rgba(124,58,237,0.25)]',
    },
    {
      id: 'trainer' as RoleType,
      title: 'Trainer',
      description: 'Create engaging learning content, share your knowledge, and support participants on their journey.',
      icon: 'co_present',
      accentColor: 'tertiary',
      borderColor: 'border-[#4cd7f6]/50',
      glowColor: 'group-hover:shadow-[inset_0_0_30px_rgba(76,215,246,0.15)]',
      iconBg: 'group-hover:bg-[#4cd7f6]/20 group-hover:text-[#4cd7f6]',
      btnColor: 'text-[#4cd7f6]',
      borderActive: 'border-[#4cd7f6] ring-2 ring-[#4cd7f6]/50 shadow-[0_0_30px_rgba(76,215,246,0.25)]',
    },
    {
      id: 'admin' as RoleType,
      title: 'Admin',
      description: 'Manage participants, monitor learning activities, and analyze capacity metrics across the platform.',
      icon: 'admin_panel_settings',
      accentColor: 'secondary',
      borderColor: 'border-[#0053db]/50',
      glowColor: 'group-hover:shadow-[inset_0_0_30px_rgba(0,83,219,0.15)]',
      iconBg: 'group-hover:bg-[#0053db]/20 group-hover:text-[#b4c5ff]',
      btnColor: 'text-[#b4c5ff]',
      borderActive: 'border-[#0053db] ring-2 ring-[#0053db]/50 shadow-[0_0_30px_rgba(0,83,219,0.25)]',
    },
  ];

  return (
    <div className="flex flex-col w-full px-6 md:px-12 py-12 items-center min-h-screen justify-center relative overflow-hidden bg-[#0d1322]">
      {/* Ambient background lights */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#7c3aed]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#4cd7f6]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full max-w-6xl z-10 flex flex-col items-center">
        {/* Step Indicator */}
        <div className="w-full flex justify-center mb-6">
          <div className="flex items-center gap-3 bg-[#191f2f] border border-white/10 rounded-full px-4 py-1.5 shadow-lg">
            <span className="text-xs font-semibold text-[#d2bbff] uppercase tracking-widest">
              Step 2 of 3
            </span>
            <div className="w-24 h-1 bg-[#2f3445] rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-[#d2bbff] rounded-full shadow-[0_0_8px_rgba(210,187,255,0.6)]"></div>
            </div>
          </div>
        </div>

        {/* Title Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-3 tracking-tight drop-shadow-md">
            How will you use Capacity Connect?
          </h1>
          <p className="text-base text-[#ccc3d8] max-w-xl mx-auto">
            Select your role to personalize your experience.
          </p>
        </div>

        {/* 3 Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {roles.map((role) => {
            const isSelected = selectedRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => handleSelectRole(role.id)}
                className={`relative text-left bg-[#191f2f]/80 backdrop-blur-xl rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 group outline-none overflow-hidden border ${
                  isSelected ? role.borderActive : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Hover Glow Layer */}
                <div className={`absolute inset-0 transition-all duration-300 ${role.glowColor}`}></div>

                {/* Icon Container */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-[#242a3a] flex items-center justify-center mb-6 transition-all duration-300 ${
                    isSelected ? 'bg-white/10 scale-105' : ''
                  } ${role.iconBg}`}
                >
                  <span className="material-symbols-outlined text-4xl text-[#ccc3d8] group-hover:scale-110 transition-transform">
                    {role.icon}
                  </span>
                </div>

                {/* Role Title */}
                <h2 className="font-display text-2xl font-bold text-white mb-3">
                  {role.title}
                </h2>

                {/* Role Description */}
                <p className="text-sm text-[#ccc3d8] leading-relaxed mb-6">
                  {role.description}
                </p>

                {/* Action Link */}
                <div
                  className={`flex items-center font-medium text-xs transition-all duration-300 ${role.btnColor} ${
                    isSelected ? 'opacity-100 translate-x-0' : 'opacity-70 group-hover:opacity-100 group-hover:translate-x-1'
                  }`}
                >
                  <span>Select Role</span>
                  <span className="material-symbols-outlined ml-1.5 text-sm">arrow_forward</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Back Navigation Button */}
        <div className="mt-12">
          <button
            onClick={() => onNavigate('signup-step1')}
            className="text-xs font-medium text-[#ccc3d8] hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to Step 1
          </button>
        </div>
      </div>
    </div>
  );
};
