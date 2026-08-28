import React, { useState } from 'react';
import { UserProfile, Course, ActivityItem, ScreenView } from '../types';

interface DashboardViewProps {
  user: UserProfile;
  courses: Course[];
  activities: ActivityItem[];
  onNavigate: (view: ScreenView) => void;
  onOpenCourse: (course: Course) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  courses,
  activities,
  onNavigate,
  onOpenCourse,
}) => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');
  const [tasks, setTasks] = useState([
    { id: 1, label: 'Basic profile created', done: true },
    { id: 2, label: 'Add 3 core skills', done: true },
    { id: 3, label: 'Complete first assessment', done: true },
    { id: 4, label: 'Enroll in a learning path', done: user.completionRate === 100 },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const weeklyData = [
    { day: 'Mon', hours: 1.5, active: false },
    { day: 'Tue', hours: 2.0, active: false },
    { day: 'Wed', hours: 1.0, active: false },
    { day: 'Thu', hours: 3.2, active: false },
    { day: 'Fri', hours: 2.5, active: false },
    { day: 'Sat', hours: 3.8, active: true },
    { day: 'Sun', hours: 1.2, active: false },
  ];

  const monthlyData = [
    { day: 'W1', hours: 8.5, active: false },
    { day: 'W2', hours: 12.0, active: false },
    { day: 'W3', hours: 14.5, active: true },
    { day: 'W4', hours: 9.0, active: false },
  ];

  const chartData = timeframe === 'weekly' ? weeklyData : monthlyData;

  const completedCount = tasks.filter(t => t.done).length;
  const completionPercentage = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Welcome Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>Welcome back, {user.name.split(' ')[0]}</span>
            <span className="animate-wave text-3xl">👋</span>
          </h1>
          <p className="text-sm md:text-base text-[#ccc3d8] mt-1">
            Here is what's happening with your learning capacity today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('learning-hub')}
            className="px-4 py-2.5 rounded-xl bg-[#191f2f] hover:bg-[#242a3a] border border-white/10 text-xs font-semibold text-[#dde2f8] transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">explore</span>
            Explore Paths
          </button>
          <button
            onClick={() => onNavigate('ai-coach')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#0053db] hover:from-[#6d28d9] hover:to-[#0047bd] text-xs font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.35)] transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">psychology</span>
            Ask AI Coach
          </button>
        </div>
      </div>

      {/* Top Row: Streak Card + 4 Stat Tiles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Streak Card (4 cols) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#7c3aed]/30 via-[#191f2f] to-[#151b2b] rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-[#7c3aed]/20 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#7c3aed]/20 border border-[#7c3aed]/40 flex items-center justify-center text-[#d2bbff] shadow-[0_0_20px_rgba(124,58,237,0.4)]">
              <span className="material-symbols-outlined text-3xl fill">local_fire_department</span>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-[#d2bbff] font-semibold">Active Streak</div>
              <div className="text-2xl font-bold font-display text-white">{user.streakDays} Day Streak!</div>
            </div>
          </div>

          <p className="text-xs text-[#ccc3d8] leading-relaxed my-4">
            You're on a roll. Complete at least one micro-lesson or assessment today to maintain your momentum.
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <span className="text-xs text-[#958da1]">Next milestone: 7 Days</span>
            <button
              onClick={() => onNavigate('learning-hub')}
              className="text-xs font-semibold text-[#4cd7f6] hover:text-[#acedff] flex items-center gap-1"
            >
              <span>Continue Learning</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Tiles (8 cols) */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Tile 1: Skills Added */}
          <div
            onClick={() => onNavigate('my-skills')}
            className="bg-[#191f2f]/80 backdrop-blur-md rounded-2xl p-5 border border-white/5 shadow-lg flex flex-col justify-between hover:border-white/20 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/20 text-[#d2bbff] flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[22px]">history_edu</span>
              </div>
              <span className="material-symbols-outlined text-[#958da1] text-sm group-hover:text-white">north_east</span>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold font-display text-white">{user.skillsAdded}</div>
              <div className="text-xs text-[#ccc3d8]">Skills Added</div>
            </div>
          </div>

          {/* Tile 2: Active Courses */}
          <div
            onClick={() => onNavigate('learning-hub')}
            className="bg-[#191f2f]/80 backdrop-blur-md rounded-2xl p-5 border border-white/5 shadow-lg flex flex-col justify-between hover:border-white/20 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#4cd7f6]/20 text-[#4cd7f6] flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[22px]">school</span>
              </div>
              <span className="material-symbols-outlined text-[#958da1] text-sm group-hover:text-white">north_east</span>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold font-display text-white">{user.activeCoursesCount}</div>
              <div className="text-xs text-[#ccc3d8]">Active Courses</div>
            </div>
          </div>

          {/* Tile 3: Achievements */}
          <div
            onClick={() => onNavigate('achievements')}
            className="bg-[#191f2f]/80 backdrop-blur-md rounded-2xl p-5 border border-white/5 shadow-lg flex flex-col justify-between hover:border-white/20 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#0053db]/20 text-[#b4c5ff] flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[22px] fill">emoji_events</span>
              </div>
              <span className="material-symbols-outlined text-[#958da1] text-sm group-hover:text-white">north_east</span>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold font-display text-white">{user.achievementsCount}</div>
              <div className="text-xs text-[#ccc3d8]">Achievements</div>
            </div>
          </div>

          {/* Tile 4: Hours Learned */}
          <div
            onClick={() => onNavigate('my-profile')}
            className="bg-[#191f2f]/80 backdrop-blur-md rounded-2xl p-5 border border-white/5 shadow-lg flex flex-col justify-between hover:border-white/20 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#007184]/20 text-[#acedff] flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[22px]">schedule</span>
              </div>
              <span className="material-symbols-outlined text-[#958da1] text-sm group-hover:text-white">north_east</span>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold font-display text-white">{user.hoursLearned}h</div>
              <div className="text-xs text-[#ccc3d8]">Hours Learned</div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Completion Rate Ring & Learning Progress Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Completion Rate Ring Card (4 cols) */}
        <div className="lg:col-span-4 bg-[#191f2f]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-white text-base">Completion Rate</h2>
            <span className="text-xs text-[#4cd7f6] font-semibold bg-[#007184]/20 px-2 py-0.5 rounded-full">
              Phase 1
            </span>
          </div>

          {/* Radial Progress Ring */}
          <div className="flex flex-col items-center justify-center my-3">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                {/* Background Ring */}
                <path
                  className="text-[#242a3a]"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Active Gradient Ring */}
                <path
                  className="transition-all duration-1000 ease-out"
                  stroke="url(#progressGradient)"
                  strokeWidth="3.5"
                  strokeDasharray={`${completionPercentage}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#4cd7f6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold font-display text-white">
                  {completionPercentage}%
                </span>
                <span className="text-[10px] text-[#958da1] uppercase tracking-wider">Completed</span>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-2 my-4">
            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className="w-full flex items-center gap-2.5 text-left text-xs p-1.5 rounded-lg hover:bg-[#242a3a] transition-colors"
              >
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                    task.done ? 'bg-[#7c3aed] text-white' : 'border border-white/20'
                  }`}
                >
                  {task.done && <span className="material-symbols-outlined text-[12px]">check</span>}
                </div>
                <span className={task.done ? 'text-[#dde2f8] line-through text-[#958da1]' : 'text-white'}>
                  {task.label}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => onNavigate('my-profile')}
            className="w-full py-2.5 bg-[#242a3a] hover:bg-[#2f3445] text-[#d2bbff] hover:text-white rounded-xl text-xs font-semibold transition-all border border-white/5 flex items-center justify-center gap-2"
          >
            <span>Update Profile Details</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        {/* Learning Progress / Capacity Calibration Chart (8 cols) */}
        <div className="lg:col-span-8 bg-[#191f2f]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-bold text-white text-base">Learning Progress</h2>
              <p className="text-xs text-[#ccc3d8]">Track active learning velocity & daily capacity focus.</p>
            </div>
            <div className="flex items-center bg-[#0d1322] p-1 rounded-xl border border-white/5">
              <button
                onClick={() => setTimeframe('weekly')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  timeframe === 'weekly' ? 'bg-[#7c3aed] text-white' : 'text-[#958da1] hover:text-white'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeframe('monthly')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  timeframe === 'monthly' ? 'bg-[#7c3aed] text-white' : 'text-[#958da1] hover:text-white'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-48 w-full flex items-end justify-between gap-2 sm:gap-4 pt-6 pb-2 px-2 border-b border-white/5">
            {chartData.map((item, idx) => {
              const maxVal = timeframe === 'weekly' ? 4.0 : 16.0;
              const heightPct = Math.min(Math.round((item.hours / maxVal) * 100), 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-[11px] text-[#4cd7f6] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.hours}h
                  </span>
                  <div className="w-full max-w-[48px] bg-[#151b2b] rounded-t-xl overflow-hidden relative flex items-end h-full">
                    <div
                      className={`w-full rounded-t-xl transition-all duration-500 ease-out ${
                        item.active
                          ? 'bg-gradient-to-t from-[#7c3aed] to-[#4cd7f6] shadow-[0_0_20px_rgba(76,215,246,0.5)]'
                          : 'bg-[#7c3aed]/40 group-hover:bg-[#7c3aed]/70'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    ></div>
                  </div>
                  <span className={`text-xs font-medium ${item.active ? 'text-[#acedff] font-bold' : 'text-[#958da1]'}`}>
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between pt-4 gap-2 text-xs text-[#ccc3d8]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7c3aed]"></span>
                Core Modules
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4cd7f6]"></span>
                Peak Velocity
              </span>
            </div>
            <span className="text-[#958da1]">Avg: 2.3 hrs / day</span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Continue Learning Courses & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Activity (4 cols) */}
        <div className="lg:col-span-4 bg-[#191f2f]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-white text-base">Recent Activity</h2>
            <button
              onClick={() => onNavigate('achievements')}
              className="text-xs text-[#d2bbff] hover:text-[#eaddff] font-semibold"
            >
              View all
            </button>
          </div>

          <div className="space-y-4">
            {activities.map((act) => (
              <div key={act.id} className="flex items-start gap-3.5 group">
                <div className={`w-9 h-9 rounded-xl ${act.iconBg} text-white flex items-center justify-center shrink-0 shadow-sm`}>
                  <span className="material-symbols-outlined text-[18px]">{act.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate group-hover:text-[#4cd7f6] transition-colors">
                    {act.title}
                  </p>
                  <p className="text-[11px] text-[#958da1]">{act.timeAgo}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/5">
            <div className="p-3 bg-[#151b2b] rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[#ccc3d8]">
                <span className="material-symbols-outlined text-[#4cd7f6] text-sm">auto_awesome</span>
                <span>AI Recommendation ready</span>
              </div>
              <button
                onClick={() => onNavigate('ai-coach')}
                className="text-[11px] font-bold text-[#acedff] hover:underline"
              >
                Review
              </button>
            </div>
          </div>
        </div>

        {/* Continue Learning Courses (8 cols) */}
        <div className="lg:col-span-8 bg-[#191f2f]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-bold text-white text-base">Continue Learning</h2>
              <p className="text-xs text-[#ccc3d8]">Pick up right where you left off in your enrolled curriculum.</p>
            </div>
            <button
              onClick={() => onNavigate('learning-hub')}
              className="text-xs text-[#4cd7f6] hover:text-[#acedff] font-semibold flex items-center gap-1"
            >
              <span>All Courses</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.slice(0, 3).map((course) => (
              <div
                key={course.id}
                onClick={() => onOpenCourse(course)}
                className="bg-[#151b2b] rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-video overflow-hidden bg-black/40">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#0d1322]/80 backdrop-blur-md text-[#d2bbff] border border-white/10">
                    {course.category}
                  </div>
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#7c3aed] text-white flex items-center justify-center shadow-lg">
                      <span className="material-symbols-outlined text-[20px] fill">play_arrow</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <h3 className="text-xs font-bold text-white line-clamp-2 group-hover:text-[#4cd7f6] transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-[11px] text-[#958da1] mt-1">{course.instructor}</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] text-[#ccc3d8] mb-1">
                      <span>{course.progress}% done</span>
                      <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#242a3a] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#7c3aed] to-[#4cd7f6] rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
