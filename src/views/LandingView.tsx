import React from 'react';
import { ScreenView } from '../types';
import { RadarChart } from '../components/RadarChart';

interface LandingViewProps {
  onNavigate: (view: ScreenView) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#0d1322] text-[#dde2f8] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-1/4 w-[700px] h-[700px] bg-[#7c3aed]/15 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-[-10%] w-[600px] h-[600px] bg-[#4cd7f6]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#0053db]/15 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Navigation Header */}
      <header className="h-20 px-6 md:px-12 flex items-center justify-between border-b border-white/5 relative z-30 bg-[#0d1322]/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#0053db] p-[1px] shadow-[0_0_20px_rgba(124,58,237,0.4)] flex items-center justify-center">
            <div className="w-full h-full bg-[#0d1322] rounded-[11px] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#acedff] text-[22px] fill">hexagon</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-[19px] tracking-tight text-white">
              CAPACITY
            </span>
            <span className="text-[10px] tracking-widest text-[#4cd7f6] uppercase font-bold -mt-1">
              CONNECT
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#ccc3d8]">
          <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">
            Live Platform
          </button>
          <button onClick={() => onNavigate('learning-hub')} className="hover:text-white transition-colors">
            Curriculum
          </button>
          <button onClick={() => onNavigate('ai-coach')} className="hover:text-white transition-colors">
            AI Coach
          </button>
          <button onClick={() => onNavigate('assessments')} className="hover:text-white transition-colors">
            Diagnostics
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('signin')}
            className="text-xs font-semibold text-[#dde2f8] hover:text-white px-4 py-2 rounded-xl hover:bg-[#191f2f] transition-all"
          >
            Sign In
          </button>
          <button
            onClick={() => onNavigate('signup-step1')}
            className="text-xs font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#0053db] hover:from-[#6d28d9] hover:to-[#0047bd] px-5 py-2.5 rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 md:px-12 pt-16 pb-24 max-w-7xl mx-auto w-full relative z-20 flex flex-col items-center text-center">
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#191f2f] border border-white/10 text-xs font-medium text-[#4cd7f6] mb-8 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-ping"></span>
          <span>Enterprise Intelligence Platform 3.0</span>
        </div>

        {/* Hero Headline */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-5xl leading-[1.1] mb-6">
          Build Skills.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d2bbff] via-[#4cd7f6] to-[#acedff]">
            Scale Learning Capacity.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-[#ccc3d8] max-w-2xl leading-relaxed mb-10">
          Transform organizational talent into measurable velocity. Map 8-dimensional competency vectors, generate adaptive micro-learning, and unlock workforce throughput.
        </p>

        {/* CTA Group */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <button
            onClick={() => onNavigate('signup-step1')}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#7c3aed] to-[#0053db] hover:from-[#6d28d9] hover:to-[#0047bd] text-white font-semibold text-sm rounded-xl shadow-[0_0_30px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2 group transition-all"
          >
            <span>Start Free Enterprise Trial</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full sm:w-auto px-8 py-4 bg-[#191f2f] hover:bg-[#242a3a] border border-white/10 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">play_circle</span>
            <span>Explore Live Demo</span>
          </button>
        </div>

        {/* Social Proof Bar */}
        <div className="flex items-center gap-4 text-xs text-[#958da1]">
          <div className="flex -space-x-2 overflow-hidden">
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0d1322]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWUMGTnW6U8St1BKXmQq_eDCq38hb8LZ7_aKTU4mJxjK7gB3nRTJ90oBwhQ-V78Xi668j3nRESj7H96RkVmaIU8_lFWzYIFOQhBGug1SEsP7-Lz0KAnM_mtNcbSRSP9DCt_FoZ0H16NDawV1xxk5nCigq5bA1lMIZ3774zSQVISgcZlV08pcsKfBuV4_2Be9KkWWE5q--2GOhD1X_7WG7Rdq-HsAHiRtfHOu32lNFt1Bjc2boiyWFX_w"
              alt="Avatar 1"
            />
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0d1322]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZoB-b53TY8nbw16WKR-lkqq8sd-QYir44L8u6Ojcmh3ArNYvqQuNCO7xi9UxHJcMbYYlGHEjH8Zr6YEu__7olq0Akw0ndEjlGGkC4Ep8JpvkPJaC7JTrKGJRGl7X9Awy4YrzuiD0iwrRwH857V-DQM1HizXIdEhUw-KgA4AHZBPQ9C3avo9bPIQlSvYUDzP902-jsEg-8rQ6dl5EMiyQg-Nuv6rCGRGXFnKrndeJHskajJAyyPl5uqg"
              alt="Avatar 2"
            />
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0d1322]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWfQiqu5gneg3Fs4T9lHMy4rF4cJndSwoQZJiBscsBazs3iB6xV14mQp3w05g50k4JomZUUat23SEIV2gRyIgwyf0bTJFKwDM-c4IS5xLkSlcXNI4ygrFUBtZpxO-M1crkSN4olX8f9b5y5f_1wcRw4DmgNscm6DXdlpdJCjjfiepcZC235od0Q-03lucU_lmoJvIe1HKsD1pxjMFCrA6T-PQH_dHHby6c0GUX1TUejQn7vwRwRC1Rsg"
              alt="Avatar 3"
            />
          </div>
          <div className="text-left">
            <div className="flex text-[#d2bbff]">
              {'★★★★★'.split('').map((s, i) => (
                <span key={i} className="text-xs">★</span>
              ))}
            </div>
            <span className="text-[#ccc3d8]">Rated 4.9/5 by 1,200+ Enterprise Teams</span>
          </div>
        </div>

        {/* 3D Dashboard Mockup Presentation */}
        <div className="w-full max-w-5xl mt-16 relative">
          <div className="relative rounded-3xl bg-[#151b2b]/90 border border-white/10 shadow-[0_0_80px_rgba(124,58,237,0.25)] p-6 md:p-8 backdrop-blur-2xl">
            {/* Window Controls */}
            <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ffb4ab]"></div>
                <div className="w-3 h-3 rounded-full bg-[#4cd7f6]"></div>
                <div className="w-3 h-3 rounded-full bg-[#d2bbff]"></div>
              </div>
              <span className="text-xs text-[#958da1] font-mono">capacity-connect://enterprise-matrix</span>
              <div className="flex items-center gap-2 text-xs text-[#4cd7f6] bg-[#007184]/20 px-3 py-1 rounded-full border border-[#4cd7f6]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-ping"></span>
                <span>Live Synced</span>
              </div>
            </div>

            {/* Dashboard Inner Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
              {/* Radar Matrix (5 cols) */}
              <div className="md:col-span-5 bg-[#0d1322]/80 p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    8D Competency Radar
                  </span>
                  <span className="text-xs text-[#d2bbff]">Calibrated</span>
                </div>
                <div className="py-2 flex items-center justify-center">
                  <RadarChart size={180} showLabels={true} />
                </div>
                <div className="text-[11px] text-[#958da1] flex justify-between pt-2 border-t border-white/5">
                  <span>Throughput: Optimal</span>
                  <span className="text-[#4cd7f6]">Score: 88/100</span>
                </div>
              </div>

              {/* Progress & Highlights (7 cols) */}
              <div className="md:col-span-7 flex flex-col justify-between gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#0d1322]/80 rounded-2xl border border-white/5">
                    <span className="text-xs text-[#ccc3d8]">Active Learners</span>
                    <div className="text-2xl font-bold font-display text-white mt-1">10,480+</div>
                    <span className="text-[11px] text-[#4cd7f6] flex items-center gap-0.5 mt-1">
                      <span className="material-symbols-outlined text-[14px]">trending_up</span>
                      +124% QoQ
                    </span>
                  </div>
                  <div className="p-4 bg-[#0d1322]/80 rounded-2xl border border-white/5">
                    <span className="text-xs text-[#ccc3d8]">Skill Velocity</span>
                    <div className="text-2xl font-bold font-display text-white mt-1">4.2x</div>
                    <span className="text-[11px] text-[#d2bbff] flex items-center gap-0.5 mt-1">
                      <span className="material-symbols-outlined text-[14px]">speed</span>
                      Faster than avg
                    </span>
                  </div>
                </div>

                <div className="p-5 bg-[#0d1322]/80 rounded-2xl border border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-white">Curriculum Distribution</span>
                    <span className="text-xs text-[#4cd7f6]">75% Avg Completion</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] text-[#ccc3d8] mb-1">
                        <span>Leadership & Strategy</span>
                        <span>85%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#242a3a] rounded-full overflow-hidden">
                        <div className="h-full bg-[#7c3aed] w-[85%] rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] text-[#ccc3d8] mb-1">
                        <span>Distributed Systems & Cloud</span>
                        <span>68%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#242a3a] rounded-full overflow-hidden">
                        <div className="h-full bg-[#4cd7f6] w-[68%] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Feature Pillars Grid */}
      <section className="px-6 md:px-12 py-20 bg-[#080e1d] border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Engineered for Enterprise Throughput
            </h2>
            <p className="text-sm sm:text-base text-[#ccc3d8]">
              Traditional learning platforms only track video views. Capacity Connect models actual human capability and aligns it directly with business impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#151b2b] border border-white/5 hover:border-white/20 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#7c3aed]/20 text-[#d2bbff] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">radar</span>
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">8D Vector Profiling</h3>
              <p className="text-xs text-[#ccc3d8] leading-relaxed">
                Map technical acumen, leadership leverage, and operational execution in a continuous multi-dimensional matrix.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#151b2b] border border-white/5 hover:border-white/20 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#4cd7f6]/20 text-[#4cd7f6] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">psychology</span>
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">Adaptive AI Coach</h3>
              <p className="text-xs text-[#ccc3d8] leading-relaxed">
                Dynamic career roadmap generation and diagnostic coaching that adapts in real-time to each team member's pace.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#151b2b] border border-white/5 hover:border-white/20 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#0053db]/20 text-[#b4c5ff] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">Verified Diagnostics</h3>
              <p className="text-xs text-[#ccc3d8] leading-relaxed">
                Empirical competency benchmarks and scenario-based simulations that validate real-world execution capacity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#151b2b] border border-white/5 hover:border-white/20 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#007184]/20 text-[#acedff] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">groups</span>
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">Role Permissions</h3>
              <p className="text-xs text-[#ccc3d8] leading-relaxed">
                Tailored workflows for Learners, Trainers, and Enterprise Administrators with robust governance and SSO integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-10 border-t border-white/5 bg-[#0d1322] text-xs text-[#958da1] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#4cd7f6] text-[18px] fill">hexagon</span>
          <span className="text-white font-semibold">Capacity Connect</span>
          <span>© 2026 Enterprise Intelligence Platform</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">Dashboard</button>
          <button onClick={() => onNavigate('signin')} className="hover:text-white transition-colors">Sign In</button>
          <button onClick={() => onNavigate('signup-step1')} className="hover:text-white transition-colors">Sign Up</button>
          <button onClick={() => onNavigate('settings')} className="hover:text-white transition-colors">Settings</button>
        </div>
      </footer>
    </div>
  );
};
