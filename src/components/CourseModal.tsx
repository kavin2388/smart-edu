import React, { useState } from 'react';
import { Course } from '../types';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onUpdateProgress: (courseId: string, completedModuleId: string) => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  onClose,
  onUpdateProgress,
}) => {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'overview' | 'notes'>('curriculum');
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userNote, setUserNote] = useState('');
  const [notesList, setNotesList] = useState<string[]>([
    'Key takeaway: Multiplier leaders ask high-clarity questions rather than giving immediate solutions.',
  ]);

  if (!course) return null;

  const currentModule = course.modules[activeModuleIndex] || course.modules[0];

  const handleAddNote = () => {
    if (!userNote.trim()) return;
    setNotesList([...notesList, userNote.trim()]);
    setUserNote('');
  };

  const handleToggleModuleComplete = (moduleId: string) => {
    onUpdateProgress(course.id, moduleId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#191f2f] border border-white/10 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#151b2b]">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#7c3aed]/20 text-[#d2bbff] border border-[#7c3aed]/30">
              {course.category}
            </span>
            <h2 className="text-lg md:text-xl font-bold font-display text-white truncate max-w-xl">
              {course.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#242a3a] text-[#ccc3d8] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* Left / Player Area (7 cols) */}
          <div className="lg:col-span-7 p-6 flex flex-col gap-6 border-r border-white/5">
            {/* Simulated Video Player */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 shadow-xl group">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-6">
                <div className="flex justify-between items-center">
                  <span className="bg-[#080e1d]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-[#acedff] border border-white/10">
                    Lesson {activeModuleIndex + 1}: {currentModule?.title}
                  </span>
                  <span className="text-xs text-white/80">{currentModule?.duration}</span>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#7c3aed] to-[#0053db] text-white flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.6)] transform hover:scale-110 transition-all"
                  >
                    <span className="material-symbols-outlined text-[32px] fill">
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                </div>

                {/* Video scrubber */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-white/70">
                    <span>{isPlaying ? '04:12' : '00:00'}</span>
                    <span>{currentModule?.duration}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden cursor-pointer">
                    <div
                      className="h-full bg-gradient-to-r from-[#7c3aed] to-[#4cd7f6] rounded-full transition-all duration-300"
                      style={{ width: isPlaying ? '35%' : '0%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-white/10 pb-2">
              <button
                onClick={() => setActiveTab('curriculum')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'curriculum'
                    ? 'bg-[#7c3aed] text-white'
                    : 'text-[#ccc3d8] hover:bg-[#242a3a]'
                }`}
              >
                Curriculum ({course.completedLessons}/{course.totalLessons})
              </button>
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'overview'
                    ? 'bg-[#7c3aed] text-white'
                    : 'text-[#ccc3d8] hover:bg-[#242a3a]'
                }`}
              >
                Overview & Instructor
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'notes'
                    ? 'bg-[#7c3aed] text-white'
                    : 'text-[#ccc3d8] hover:bg-[#242a3a]'
                }`}
              >
                Smart Notes ({notesList.length})
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'overview' && (
              <div className="space-y-4 text-sm text-[#ccc3d8]">
                <p className="leading-relaxed">{course.description}</p>
                <div className="p-4 rounded-xl bg-[#151b2b] border border-white/5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-900/60 border border-purple-500/40 flex items-center justify-center font-bold text-white">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{course.instructor}</h4>
                    <p className="text-xs text-[#958da1]">{course.instructorRole}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userNote}
                    onChange={(e) => setUserNote(e.target.value)}
                    placeholder="Take an intelligent timestamped note..."
                    className="flex-1 bg-[#151b2b] border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-[#958da1]"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                  />
                  <button
                    onClick={handleAddNote}
                    className="px-4 py-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {notesList.map((note, idx) => (
                    <div key={idx} className="p-3 bg-[#151b2b] rounded-xl text-xs text-[#dde2f8] border border-white/5 flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#4cd7f6] text-[16px] mt-0.5">edit_note</span>
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div className="text-xs text-[#ccc3d8]">
                Select a lesson on the right to start watching and toggle completion status.
              </div>
            )}
          </div>

          {/* Right / Module List Area (5 cols) */}
          <div className="lg:col-span-5 p-6 bg-[#151b2b] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold text-white text-sm">Course Modules</h3>
              <span className="text-xs text-[#4cd7f6] font-semibold">{course.progress}% Complete</span>
            </div>

            <div className="space-y-2.5 overflow-y-auto max-h-[500px] pr-1">
              {course.modules.map((mod, index) => {
                const isCurrent = index === activeModuleIndex;
                return (
                  <div
                    key={mod.id}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isCurrent
                        ? 'bg-[#242a3a] border-[#7c3aed] shadow-[0_0_15px_rgba(124,58,237,0.2)]'
                        : 'bg-[#191f2f] border-white/5 hover:border-white/20'
                    }`}
                    onClick={() => setActiveModuleIndex(index)}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleModuleComplete(mod.id);
                        }}
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                          mod.completed
                            ? 'bg-[#7c3aed] text-white'
                            : 'border border-white/20 hover:border-[#7c3aed] text-transparent hover:text-white/40'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      </button>
                      <div>
                        <p className={`text-xs font-semibold ${isCurrent ? 'text-white' : 'text-[#dde2f8]'}`}>
                          {index + 1}. {mod.title}
                        </p>
                        <p className="text-[11px] text-[#958da1]">{mod.duration}</p>
                      </div>
                    </div>

                    <span className="material-symbols-outlined text-[#958da1] text-[18px]">
                      {isCurrent ? 'play_circle' : 'chevron_right'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
