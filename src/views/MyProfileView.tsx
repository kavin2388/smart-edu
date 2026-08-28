import React, { useState } from 'react';
import { UserProfile, ScreenView } from '../types';
import { RadarChart } from '../components/RadarChart';

interface MyProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updates: Partial<UserProfile>) => void;
  onNavigate: (view: ScreenView) => void;
}

export const MyProfileView: React.FC<MyProfileViewProps> = ({
  user,
  onUpdateUser,
  onNavigate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);
  const [department, setDepartment] = useState(user.department);
  const [organization, setOrganization] = useState(user.organization);
  const [careerGoal, setCareerGoal] = useState(user.careerGoal);

  const handleSave = () => {
    onUpdateUser({
      name,
      role,
      department,
      organization,
      careerGoal,
    });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white">
            My Profile & Capacity Vector
          </h1>
          <p className="text-xs md:text-sm text-[#ccc3d8]">
            Your 8-dimensional competency matrix and professional trajectory.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-[#191f2f] hover:bg-[#242a3a] text-xs font-semibold text-[#ccc3d8]"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-xs font-semibold text-white shadow-lg"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2.5 rounded-xl bg-[#191f2f] hover:bg-[#242a3a] border border-white/10 text-xs font-semibold text-[#dde2f8] transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">edit</span>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: User Identity & Career Goals (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Identity Card */}
          <div className="bg-[#191f2f]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl">
            <div className="flex items-start gap-5">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#7c3aed] to-[#4cd7f6] p-[2px] shadow-xl shrink-0">
                <div className="w-full h-full rounded-[14px] bg-[#0d1322] flex items-center justify-center text-white font-bold text-2xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#0d1322] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white"
                      placeholder="Full Name"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="bg-[#0d1322] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                        placeholder="Role"
                      />
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="bg-[#0d1322] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                        placeholder="Department"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold font-display text-white">{user.name}</h2>
                    <p className="text-xs text-[#4cd7f6] font-medium">{user.role} • {user.department}</p>
                    <p className="text-xs text-[#958da1] mt-0.5">{user.organization} • {user.email}</p>
                  </>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#7c3aed]/20 text-[#d2bbff] border border-[#7c3aed]/30 capitalize">
                    {user.userType} Role
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#007184]/20 text-[#acedff] border border-[#007184]/30 capitalize">
                    {user.experienceLevel} Level
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#0053db]/20 text-[#b4c5ff] border border-[#0053db]/30">
                    {user.streakDays} Day Streak
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Career Trajectory & Objectives */}
          <div className="bg-[#191f2f]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl">
            <h3 className="font-display font-bold text-white text-base mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#d2bbff]">flag</span>
              Primary Career Objective (12-18 Months)
            </h3>
            {isEditing ? (
              <textarea
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                className="w-full bg-[#0d1322] border border-white/10 rounded-xl p-3 text-xs text-white min-h-[90px]"
              />
            ) : (
              <p className="text-xs sm:text-sm text-[#ccc3d8] leading-relaxed bg-[#151b2b] p-4 rounded-xl border border-white/5">
                "{user.careerGoal}"
              </p>
            )}

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-[#958da1]">Aligned Learning Path:</span>
              <span className="text-xs font-semibold text-[#4cd7f6]">Engineering Management & Scaled Systems</span>
            </div>
          </div>

          {/* Focus Areas & Interests */}
          <div className="bg-[#191f2f]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl">
            <h3 className="font-display font-bold text-white text-base mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4cd7f6]">category</span>
              Capacity Focus Areas
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-[#151b2b] hover:bg-[#242a3a] border border-white/10 text-xs font-medium text-[#dde2f8] rounded-xl transition-colors"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 8D Radar Matrix Visualization (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-[#191f2f]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-display font-bold text-white text-base">Profile Vector Matrix</h3>
                <span className="text-xs text-[#4cd7f6] bg-[#007184]/20 px-2 py-0.5 rounded-full font-semibold">
                  8 Dimensions
                </span>
              </div>
              <p className="text-xs text-[#ccc3d8]">Computed from your assessments & course completions.</p>
            </div>

            <div className="my-6 py-2 flex items-center justify-center">
              <RadarChart
                interests={user.interests}
                level={user.experienceLevel}
                size={260}
                showLabels={true}
              />
            </div>

            <div className="space-y-2 pt-4 border-t border-white/5 text-xs text-[#ccc3d8]">
              <div className="flex justify-between">
                <span>Overall Competency Score:</span>
                <span className="text-[#d2bbff] font-bold">78 / 100</span>
              </div>
              <div className="flex justify-between">
                <span>Highest Vector:</span>
                <span className="text-[#4cd7f6] font-semibold">Technology & Systems (88%)</span>
              </div>
              <div className="flex justify-between">
                <span>Growth Opportunity:</span>
                <span className="text-[#b4c5ff] font-semibold">Leadership Multiplier (72%)</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('assessments')}
              className="mt-6 w-full py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-semibold shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Take Benchmark Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
