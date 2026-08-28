import React, { useState } from 'react';
import { Course, ScreenView } from '../types';

interface LearningHubViewProps {
  courses: Course[];
  onOpenCourse: (course: Course) => void;
  onNavigate: (view: ScreenView) => void;
}

export const LearningHubView: React.FC<LearningHubViewProps> = ({
  courses,
  onOpenCourse,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Leadership', 'Soft Skills', 'Management', 'Technology', 'Data Analytics'];

  const filteredCourses = courses.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white">
            Learning Hub & Pathways
          </h1>
          <p className="text-xs md:text-sm text-[#ccc3d8]">
            Curated organizational curricula mapped directly to your 8-dimensional competency matrix.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('ai-coach')}
            className="px-4 py-2.5 rounded-xl bg-[#191f2f] hover:bg-[#242a3a] border border-white/10 text-xs font-semibold text-[#acedff] flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            AI Personalized Plan
          </button>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#7c3aed] text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                  : 'bg-[#191f2f] text-[#ccc3d8] hover:bg-[#242a3a] border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-[#958da1] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses..."
            className="w-full bg-[#0d1322] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder-[#958da1] focus:outline-none focus:border-[#4cd7f6]"
          />
        </div>
      </div>

      {/* Courses Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            onClick={() => onOpenCourse(course)}
            className="bg-[#191f2f]/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 group cursor-pointer flex flex-col justify-between shadow-xl"
          >
            <div>
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-black/50">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#191f2f] via-transparent to-transparent"></div>
                
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#0d1322]/80 backdrop-blur-md text-[#d2bbff] border border-white/10">
                    {course.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#0d1322]/80 backdrop-blur-md text-[#acedff] border border-white/10">
                    {course.duration}
                  </span>
                </div>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#7c3aed] text-white flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.6)] transform group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[24px] fill">play_arrow</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="text-sm md:text-base font-bold font-display text-white group-hover:text-[#4cd7f6] transition-colors leading-snug line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-xs text-[#ccc3d8] mt-2 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs text-[#958da1]">
                  <span className="material-symbols-outlined text-[16px]">person</span>
                  <span className="truncate">{course.instructor}</span>
                </div>
              </div>
            </div>

            {/* Footer Progress / Start */}
            <div className="p-5 pt-0 border-t border-white/5 mt-auto">
              <div className="pt-3">
                <div className="flex justify-between text-[11px] text-[#ccc3d8] mb-1.5 font-medium">
                  <span>{course.progress > 0 ? `${course.progress}% Completed` : 'Not Started'}</span>
                  <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
                </div>
                <div className="h-1.5 w-full bg-[#151b2b] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#7c3aed] to-[#4cd7f6] rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
