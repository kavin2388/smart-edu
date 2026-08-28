import React, { useState } from 'react';
import { ScreenView, UserProfile } from '../types';

interface SignUpStep1ViewProps {
  onNavigate: (view: ScreenView) => void;
  user: UserProfile;
  onUpdateUser: (updates: Partial<UserProfile>) => void;
}

export const SignUpStep1View: React.FC<SignUpStep1ViewProps> = ({
  onNavigate,
  user,
  onUpdateUser,
}) => {
  const [fullName, setFullName] = useState(user.name || 'Jane Doe');
  const [email, setEmail] = useState(user.email || 'jane@company.com');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [orgName, setOrgName] = useState(user.organization || 'Acme Corp');
  const [agreed, setAgreed] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }
    onUpdateUser({
      name: fullName,
      email: email,
      organization: orgName,
    });
    onNavigate('signup-step2');
  };

  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-[#0d1322] items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#7c3aed]/10 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#4cd7f6]/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative w-full max-w-2xl bg-[#191f2f]/90 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden p-6 md:p-12 border border-white/10 z-10">
        {/* Header with Step Indicator */}
        <div className="flex items-start md:items-center justify-between mb-8 pb-6 border-b border-white/5">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">
              Join Capacity Connect
            </h1>
            <p className="text-sm text-[#ccc3d8]">Elevate your organizational throughput.</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs font-semibold text-[#acedff] uppercase tracking-wider mb-2">
              Step 1 of 3
            </span>
            <div className="flex gap-1.5">
              <div className="w-10 h-1 bg-[#4cd7f6] rounded-full shadow-[0_0_8px_#4cd7f6]"></div>
              <div className="w-10 h-1 bg-[#2f3445] rounded-full"></div>
              <div className="w-10 h-1 bg-[#2f3445] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#dde2f8]">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                className="bg-[#0d1322] border border-white/10 text-sm text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6]/50 placeholder-[#958da1] transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#dde2f8]">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@company.com"
                className="bg-[#0d1322] border border-white/10 text-sm text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6]/50 placeholder-[#958da1] transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#dde2f8]">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-[#0d1322] border border-white/10 text-sm text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6]/50 placeholder-[#958da1] transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#dde2f8]">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-[#0d1322] border border-white/10 text-sm text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6]/50 placeholder-[#958da1] transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#dde2f8]">Organization Name</label>
            <input
              type="text"
              required
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Acme Corp"
              className="bg-[#0d1322] border border-white/10 text-sm text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6]/50 placeholder-[#958da1] transition-all"
            />
          </div>

          {/* Terms Agreement Checkbox */}
          <div className="flex items-center gap-3 pt-2">
            <label className="relative flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 bg-[#0d1322] border border-white/20 rounded text-[#7c3aed] focus:ring-0 cursor-pointer"
              />
              <span className="ml-2 text-xs text-[#ccc3d8]">
                I agree to the{' '}
                <a href="#" className="text-[#d2bbff] hover:text-[#eaddff] underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#d2bbff] hover:text-[#eaddff] underline">
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>

          {/* Buttons Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-white/5">
            <button
              type="button"
              onClick={() => onNavigate('signin')}
              className="text-xs font-medium text-[#ccc3d8] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Back to Sign In
            </button>

            <button
              type="submit"
              className="group relative bg-gradient-to-r from-[#7c3aed] to-[#0053db] hover:from-[#6d28d9] hover:to-[#0047bd] text-xs font-semibold text-white px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all duration-300 flex items-center gap-2"
            >
              <span>Continue</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* Footer link */}
      <div className="mt-8 text-center z-10">
        <p className="text-xs text-[#ccc3d8]">
          Already have an account?{' '}
          <button
            onClick={() => onNavigate('signin')}
            className="text-[#4cd7f6] hover:text-[#acedff] font-medium transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};
