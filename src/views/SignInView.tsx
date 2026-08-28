import React, { useState } from 'react';
import { ScreenView, UserProfile } from '../types';

interface SignInViewProps {
  onNavigate: (view: ScreenView) => void;
  onLogin: (email: string) => void;
  user: UserProfile;
}

export const SignInView: React.FC<SignInViewProps> = ({
  onNavigate,
  onLogin,
  user,
}) => {
  const [email, setEmail] = useState(user.email || 'kavinfelix.7@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onLogin(email);
      onNavigate('dashboard');
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onLogin(email);
      onNavigate('dashboard');
    }, 800);
  };

  return (
    <div className="flex flex-col w-full min-h-screen md:flex-row bg-[#0d1322] text-[#dde2f8]">
      {/* Left Column: Visual Showcase */}
      <div className="hidden md:flex flex-col md:w-1/2 lg:w-3/5 bg-[#080e1d] relative overflow-hidden p-8 md:p-12 lg:p-16 justify-between border-r border-white/5">
        {/* Ambient Glows & Grid */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#7c3aed]/15 blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#4cd7f6]/10 blur-[140px]"></div>
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-signin" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#4a4455]"></path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-signin)"></rect>
          </svg>

          {/* Floating UI Mockup */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg">
            <div
              className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-700 ease-out z-10 bg-[#0d1322]/60 backdrop-blur-md border border-white/10"
              style={{ boxShadow: '0 0 50px rgba(124, 58, 237, 0.2)' }}
            >
              {/* Mock Window Header */}
              <div className="w-full h-8 bg-[#242a3a] flex items-center px-4 space-x-2 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-[#ffb4ab]"></div>
                <div className="w-3 h-3 rounded-full bg-[#4cd7f6]"></div>
                <div className="w-3 h-3 rounded-full bg-[#d2bbff]"></div>
              </div>

              {/* Mock Dashboard Content */}
              <div className="p-6 h-full flex flex-col space-y-6">
                <div className="h-6 w-1/3 bg-[#2f3445] rounded"></div>
                <div className="space-y-3">
                  <div className="h-3 w-full bg-[#191f2f] rounded"></div>
                  <div className="h-3 w-5/6 bg-[#191f2f] rounded"></div>
                  <div className="h-3 w-4/6 bg-[#191f2f] rounded"></div>
                </div>
                <div className="flex-1 flex items-end">
                  <div className="w-full flex items-end space-x-4 h-32">
                    <div className="flex-1 bg-[#d2bbff]/20 rounded-t-sm" style={{ height: '40%' }}></div>
                    <div className="flex-1 bg-[#4cd7f6]/30 rounded-t-sm" style={{ height: '70%' }}></div>
                    <div className="flex-1 bg-[#d2bbff]/50 rounded-t-sm" style={{ height: '55%' }}></div>
                    <div className="flex-1 bg-[#4cd7f6]/60 rounded-t-sm" style={{ height: '90%' }}></div>
                    <div
                      className="flex-1 bg-[#d2bbff] rounded-t-sm"
                      style={{ height: '100%', boxShadow: '0 0 20px rgba(210, 187, 255, 0.5)' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Growth Rate Badge */}
            <div
              className="absolute top-[20%] right-[-10%] w-64 h-32 bg-[#191f2f]/90 backdrop-blur-xl rounded-xl z-20 shadow-2xl p-4 flex items-center space-x-4 border border-white/10 animate-[bounce_6s_infinite]"
            >
              <div className="w-12 h-12 rounded-full bg-[#4cd7f6]/20 flex items-center justify-center text-[#4cd7f6]">
                <span className="material-symbols-outlined text-2xl">trending_up</span>
              </div>
              <div>
                <p className="text-xs text-[#ccc3d8] uppercase tracking-wider font-semibold">Growth Rate</p>
                <p className="text-2xl font-bold font-display text-white">+124%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Logo */}
        <div className="relative z-30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#007184] flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-[#ede0ff] fill">hexagon</span>
            </div>
            <span className="font-display font-bold text-xl text-white tracking-tight">Capacity Connect</span>
          </div>
        </div>

        {/* Bottom Hero Typography */}
        <div className="relative z-30 mt-auto pt-16">
          <h1 className="font-display text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
            Build Skills.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d2bbff] via-[#4cd7f6] to-[#acedff]">
              Unlock Potential.
            </span>
          </h1>
          <p className="text-base lg:text-lg text-[#ccc3d8] max-w-md leading-relaxed">
            The enterprise intelligence platform for scaling your organization's learning capacity. Access powerful tools, insights, and growth vectors.
          </p>
        </div>
      </div>

      {/* Right Column: Sign In Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 md:px-12 lg:px-16 bg-[#0d1322] relative min-h-screen">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Top Brand */}
          <div className="md:hidden flex items-center space-x-3 mb-10">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#007184] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[#ede0ff] text-sm fill">hexagon</span>
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight">Capacity Connect</span>
          </div>

          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold text-white mb-2 tracking-tight">Welcome back</h2>
            <p className="text-sm text-[#ccc3d8]">Sign in to your account to continue.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email Field */}
              <div className="relative group">
                <label className="sr-only" htmlFor="email">Email address</label>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[#958da1] group-focus-within:text-[#4cd7f6] transition-colors">
                    mail
                  </span>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="block w-full pl-12 pr-4 py-3.5 bg-[#151b2b] text-white text-sm rounded-xl border border-white/10 shadow-sm focus:outline-none focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6]/40 transition-all placeholder-[#958da1]"
                />
              </div>

              {/* Password Field */}
              <div className="relative group">
                <label className="sr-only" htmlFor="password">Password</label>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[#958da1] group-focus-within:text-[#4cd7f6] transition-colors">
                    lock
                  </span>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="block w-full pl-12 pr-12 py-3.5 bg-[#151b2b] text-white text-sm rounded-xl border border-white/10 shadow-sm focus:outline-none focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6]/40 transition-all placeholder-[#958da1]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#958da1] hover:text-white transition-colors focus:outline-none"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#151b2b] border border-white/20 text-[#7c3aed] focus:ring-0 cursor-pointer"
                />
                <span className="ml-2 text-xs text-[#ccc3d8]">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => alert('Password reset link sent to ' + email)}
                className="text-xs font-semibold text-[#d2bbff] hover:text-[#eaddff] transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isAuthenticating}
                className="group relative w-full flex justify-center items-center py-3.5 px-4 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-[#7c3aed] to-[#0053db] hover:from-[#6d28d9] hover:to-[#0047bd] focus:outline-none shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:shadow-[0_0_30px_rgba(124,58,237,0.55)] transition-all duration-300 disabled:opacity-75"
              >
                <span>{isAuthenticating ? 'Authenticating...' : 'Sign In'}</span>
                <span className="absolute right-4 inset-y-0 flex items-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-[#0d1322] text-[#958da1] font-medium">Or continue with</span>
              </div>
            </div>

            {/* Google OAuth Button */}
            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex justify-center items-center py-3 px-4 rounded-xl bg-[#151b2b] hover:bg-[#191f2f] border border-white/10 text-white font-medium text-xs transition-colors shadow-sm"
              >
                <svg className="h-4 w-4 mr-3" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Google</span>
              </button>
            </div>
          </div>

          {/* Bottom Switch to Sign Up */}
          <div className="mt-8 text-center">
            <p className="text-xs text-[#ccc3d8]">
              Don't have an account?{' '}
              <button
                onClick={() => onNavigate('signup-step1')}
                className="font-semibold text-[#4cd7f6] hover:text-[#acedff] transition-colors underline decoration-[#4cd7f6]/40 underline-offset-4 hover:decoration-[#4cd7f6]"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
