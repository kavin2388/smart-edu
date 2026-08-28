import React, { useState } from 'react';
import { SkillItem, ScreenView } from '../types';

interface MySkillsViewProps {
  skills: SkillItem[];
  onAddSkill: (skill: SkillItem) => void;
  onNavigate: (view: ScreenView) => void;
}

export const MySkillsView: React.FC<MySkillsViewProps> = ({
  skills,
  onAddSkill,
  onNavigate,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Technology');
  const [newSkillProficiency, setNewSkillProficiency] = useState(70);
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Technology', 'Leadership', 'Management', 'Soft Skills', 'Design', 'Data Analytics'];

  const filteredSkills = filterCategory === 'All'
    ? skills
    : skills.filter(s => s.category === filterCategory);

  const handleCreateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    let level: 'Novice' | 'Competent' | 'Proficient' | 'Expert' = 'Competent';
    if (newSkillProficiency < 40) level = 'Novice';
    else if (newSkillProficiency < 70) level = 'Competent';
    else if (newSkillProficiency < 90) level = 'Proficient';
    else level = 'Expert';

    const newSkill: SkillItem = {
      id: `skill-${Date.now()}`,
      name: newSkillName.trim(),
      category: newSkillCategory,
      proficiency: newSkillProficiency,
      level,
      verified: false,
      coursesCount: 1,
    };

    onAddSkill(newSkill);
    setNewSkillName('');
    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white">
            My Skills & Competencies
          </h1>
          <p className="text-xs md:text-sm text-[#ccc3d8]">
            Manage, calibrate, and verify your organizational skill proficiencies.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#0053db] hover:from-[#6d28d9] hover:to-[#0047bd] text-xs font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.35)] transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add New Skill
        </button>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              filterCategory === cat
                ? 'bg-[#7c3aed] text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                : 'bg-[#191f2f] text-[#ccc3d8] hover:bg-[#242a3a] border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="bg-[#191f2f]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl flex flex-col justify-between hover:border-white/20 transition-all group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#151b2b] text-[#d2bbff] border border-white/10">
                  {skill.category}
                </span>
                {skill.verified ? (
                  <span className="flex items-center gap-1 text-[11px] text-[#4cd7f6] bg-[#007184]/20 px-2 py-0.5 rounded-full font-medium">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    Verified
                  </span>
                ) : (
                  <span className="text-[11px] text-[#958da1] bg-[#151b2b] px-2 py-0.5 rounded-full">
                    Self-assessed
                  </span>
                )}
              </div>

              <h3 className="font-display font-bold text-white text-base mt-2 group-hover:text-[#4cd7f6] transition-colors">
                {skill.name}
              </h3>
              <p className="text-xs text-[#958da1] mt-1">{skill.coursesCount} active course path(s)</p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[#ccc3d8] font-medium">{skill.level}</span>
                <span className="text-white font-bold">{skill.proficiency}%</span>
              </div>
              <div className="h-2 w-full bg-[#151b2b] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#7c3aed] to-[#4cd7f6] rounded-full transition-all duration-500"
                  style={{ width: `${skill.proficiency}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Skill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#191f2f] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <h3 className="font-display font-bold text-white text-base">Add New Competency</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#958da1] hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateSkill} className="space-y-4">
              <div>
                <label className="text-xs text-[#dde2f8] block mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="e.g. Distributed Consensus Algorithms"
                  className="w-full bg-[#0d1322] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#958da1]"
                />
              </div>

              <div>
                <label className="text-xs text-[#dde2f8] block mb-1">Category</label>
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                  className="w-full bg-[#0d1322] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white"
                >
                  <option value="Technology">Technology</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Management">Management</option>
                  <option value="Soft Skills">Soft Skills</option>
                  <option value="Design">Design</option>
                  <option value="Data Analytics">Data Analytics</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs text-[#dde2f8] mb-1">
                  <span>Self-Assessed Proficiency</span>
                  <span className="text-[#4cd7f6] font-bold">{newSkillProficiency}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={newSkillProficiency}
                  onChange={(e) => setNewSkillProficiency(Number(e.target.value))}
                  className="w-full accent-[#7c3aed]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#151b2b] text-xs text-[#ccc3d8]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#7c3aed] text-xs text-white font-semibold"
                >
                  Add Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
