import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ScreenView, UserProfile, ExperienceLevel } from '../types';
import { RadarChart } from '../components/RadarChart';

interface SignUpStep3ViewProps {
  onNavigate: (view: ScreenView) => void;
  user: UserProfile;
  onUpdateUser: (updates: Partial<UserProfile>) => void;
}

export const SignUpStep3View: React.FC<SignUpStep3ViewProps> = ({
  onNavigate,
  user,
  onUpdateUser,
}) => {
  const [fullName, setFullName] = useState(user.name || 'Jane Doe');
  const [organization, setOrganization] = useState(user.organization || 'Acme Corp');
  const [department, setDepartment] = useState(user.department || 'Engineering');
  const [role, setRole] = useState(user.role || 'Senior Developer');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(user.experienceLevel || 'advanced');
  const [interests, setInterests] = useState<string[]>(
    user.interests && user.interests.length > 0
      ? user.interests
      : ['Technology', 'Project Management', 'Design']
  );
  const [careerGoal, setCareerGoal] = useState(
    user.careerGoal || 'Describe your main professional objective for the next 12-18 months...'
  );

  const interestOptions = [
    'Technology',
    'Leadership',
    'Communication',
    'Project Management',
    'Business',
    'Design',
    'Data Analytics',
    'Teamwork',
  ];

  const experienceOptions: { level: ExperienceLevel; label: string; icon: string }[] = [
    { level: 'beginner', label: 'Beginner', icon: 'battery_1_bar' },
    { level: 'intermediate', label: 'Intermediate', icon: 'battery_3_bar' },
    { level: 'advanced', label: 'Advanced', icon: 'battery_5_bar' },
    { level: 'expert', label: 'Expert', icon: 'battery_full' },
  ];

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleComplete = () => {
    onUpdateUser({
      name: fullName,
      organization,
      department,
      role,
      experienceLevel,
      interests,
      careerGoal,
      completionRate: 100,
    });

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7c3aed', '#4cd7f6', '#d2bbff', '#acedff'],
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      onNavigate('dashboard');
    }, 600);
  };

  return (
    <div className="flex flex-col w-full relative min-h-screen bg-[#0d1322] text-[#dde2f8]">
      {/* Decorative Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-[#7c3aed] opacity-15 blur-[140px] rounded-full mix-blend-screen"></div>
        <div className="absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] bg-[#007184] opacity-10 blur-[160px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="flex flex-col max-w-6xl w-full mx-auto px-4 md:px-8 py-10 md:py-16 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="flex flex-col max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-10 h-[2px] bg-[#acedff] rounded-full shadow-[0_0_10px_rgba(76,215,246,0.5)]"></span>
              <span className="text-xs font-semibold text-[#acedff] uppercase tracking-wider">
                Step 3 of 3
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-2">
              Let's Build Your Learning Profile
            </h1>
            <p className="text-sm md:text-base text-[#ccc3d8]">
              Configure your professional context so we can recommend the most relevant capacity-building paths.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex flex-col gap-2 w-full md:w-64">
            <div className="flex justify-between text-xs text-[#ccc3d8] font-medium">
              <span>Completion</span>
              <span className="text-[#acedff] font-bold">100%</span>
            </div>
            <div className="h-1.5 w-full bg-[#242a3a] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#7c3aed] to-[#4cd7f6] w-full rounded-full shadow-[0_0_12px_rgba(76,215,246,0.4)]"></div>
            </div>
          </div>
        </div>

        {/* Main Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Left Column: Form Fields (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Section 1: Basic Info */}
            <div className="bg-[#191f2f]/70 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl relative group transition-all duration-300 border border-white/5">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#7c3aed] rounded-l-2xl opacity-60"></div>
              <h2 className="font-display text-xl font-bold text-white mb-5 flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#d2bbff]">person</span>
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#ccc3d8]">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="bg-[#0B1120] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4cd7f6] focus:shadow-[0_0_12px_rgba(76,215,246,0.2)] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#ccc3d8]">Organization</label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Acme Corp"
                    className="bg-[#0B1120] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4cd7f6] focus:shadow-[0_0_12px_rgba(76,215,246,0.2)] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#ccc3d8]">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="Engineering"
                    className="bg-[#0B1120] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4cd7f6] focus:shadow-[0_0_12px_rgba(76,215,246,0.2)] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#ccc3d8]">Role</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Senior Developer"
                    className="bg-[#0B1120] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4cd7f6] focus:shadow-[0_0_12px_rgba(76,215,246,0.2)] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Experience Level */}
            <div className="bg-[#191f2f]/70 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl relative group transition-all duration-300 border border-white/5">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0053db] rounded-l-2xl opacity-60"></div>
              <h2 className="font-display text-xl font-bold text-white mb-5 flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#b4c5ff]">trending_up</span>
                Experience Level
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {experienceOptions.map((opt) => {
                  const isSelected = experienceLevel === opt.level;
                  return (
                    <button
                      key={opt.level}
                      type="button"
                      onClick={() => setExperienceLevel(opt.level)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-[#0053db] border-[#b4c5ff] shadow-[0_0_20px_rgba(0,83,219,0.4)] text-white'
                          : 'bg-[#151b2b] border-white/5 text-[#ccc3d8] hover:bg-[#242a3a]'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-2xl mb-1 ${isSelected ? 'text-white' : 'text-[#958da1]'}`}>
                        {opt.icon}
                      </span>
                      <span className="text-xs font-semibold">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Interests */}
            <div className="bg-[#191f2f]/70 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl relative group transition-all duration-300 border border-white/5">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#007184] rounded-l-2xl opacity-60"></div>
              <h2 className="font-display text-xl font-bold text-white mb-1 flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#4cd7f6]">category</span>
                Interests
              </h2>
              <p className="text-xs text-[#ccc3d8] mb-5">Select the topics you want to focus on developing.</p>
              <div className="flex flex-wrap gap-2.5">
                {interestOptions.map((interest) => {
                  const isSelected = interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                        isSelected
                          ? 'bg-[#7c3aed]/25 text-[#d2bbff] border-[#7c3aed]/60 shadow-[0_0_12px_rgba(210,187,255,0.2)]'
                          : 'bg-[#151b2b] text-[#ccc3d8] border-white/10 hover:border-white/20'
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 4: Career Goal */}
            <div className="bg-[#191f2f]/70 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl relative group transition-all duration-300 border border-white/5">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#93000a] rounded-l-2xl opacity-60"></div>
              <h2 className="font-display text-xl font-bold text-white mb-2 flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#ffb4ab]">flag</span>
                Primary Career Goal
              </h2>
              <textarea
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                placeholder="Describe your main professional objective for the next 12-18 months..."
                className="w-full bg-[#0B1120] border border-white/10 rounded-xl p-4 text-xs md:text-sm text-white focus:outline-none focus:border-[#4cd7f6] focus:shadow-[0_0_10px_rgba(76,215,246,0.2)] transition-all min-h-[110px] resize-y"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-2 pt-4">
              <button
                type="button"
                onClick={() => onNavigate('signup-step2')}
                className="text-xs font-medium text-[#ccc3d8] hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Back to Role Selection
              </button>

              <button
                type="button"
                onClick={handleComplete}
                className="bg-gradient-to-r from-[#7c3aed] to-[#0053db] hover:from-[#6d28d9] hover:to-[#0047bd] text-white border-t border-white/20 px-8 py-3.5 rounded-xl font-semibold text-xs md:text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(124,58,237,0.4)] transition-all transform hover:-translate-y-0.5"
              >
                <span>Complete Profile</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Vector Matrix & Neural Sync (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Vector Matrix Card */}
            <div className="bg-[#242a3a]/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/5 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/10 to-transparent pointer-events-none"></div>
              <div>
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-1">
                  Profile Vector Matrix
                </h3>
                <p className="text-[11px] text-[#ccc3d8]">Real-time capacity mapping based on your inputs.</p>
              </div>

              {/* Reactive Radar Chart Component */}
              <div className="my-4 py-2">
                <RadarChart interests={interests} level={experienceLevel} size={220} showLabels={true} />
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#958da1]">
                <span>Vectors calibrated: {interests.length} / 8</span>
                <span className="text-[#4cd7f6] capitalize">{experienceLevel}</span>
              </div>
            </div>

            {/* Ambient Image Neural Sync Feature */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/5 h-[260px] relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbKlxLZkwp6wgDLPXMpOo608HTdN_QUccw7-S51GzSiU61cRMl9ZprRQIsF9x8bMqxEyrfw3WjVCc0E0UnyQZT-KPFRacdlf8oVI4SUXCM24goGh_ykASPsNKHUdUDwe6gk_kn_HJObOv12rkrTUlN7XVckYLBWmzKZns_Y8wl53MR9AFw2r0MsQWkflkTSP4dQvdRUYxRjkI1oRaZV1ud1LbiVY2jUcqkXFEZkHS5ht7yRmscGZnMLQ"
                alt="Neural Network Matrix"
                className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1322] via-[#0d1322]/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <div className="text-[10px] uppercase text-[#4cd7f6] font-mono tracking-[0.2em] mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-ping"></span>
                  Syncing
                </div>
                <p className="text-xs md:text-sm text-white font-light leading-snug">
                  Connecting your profile to our global learning matrix.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
