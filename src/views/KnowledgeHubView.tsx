import React, { useState } from 'react';
import { ScreenView } from '../types';

interface KnowledgeHubViewProps {
  onNavigate: (view: ScreenView) => void;
}

export const KnowledgeHubView: React.FC<KnowledgeHubViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'frameworks' | 'playbooks' | 'whitepapers'>('all');
  const [search, setSearch] = useState('');

  const articles = [
    {
      id: 'k1',
      title: 'Engineering Capacity Multipliers: The 10x Team Blueprint',
      type: 'playbooks',
      author: 'Capacity Connect Research Group',
      readTime: '8 min read',
      downloads: '1.4k',
      summary: 'Practical frameworks for identifying leverage points in engineering organizations, removing coordination overhead, and measuring velocity without toxic micromanagement.',
      tag: 'Engineering Ops',
    },
    {
      id: 'k2',
      title: 'The 8-Dimensional Vector Competency Model: Theoretical Underpinnings',
      type: 'whitepapers',
      author: 'Dr. Elena Rostova & Core Team',
      readTime: '15 min read',
      downloads: '3.2k',
      summary: 'An empirical exploration of how multi-dimensional skill vectors predict leadership success and cross-functional throughput in distributed environments.',
      tag: 'Vector Theory',
    },
    {
      id: 'k3',
      title: 'Asynchronous Decision Artifacts (ADAs) in Remote Engineering',
      type: 'frameworks',
      author: 'Marcus Chen',
      readTime: '6 min read',
      downloads: '980',
      summary: 'A step-by-step guideline and ready-to-use template for writing high-clarity RFCs and asynchronous architecture proposals.',
      tag: 'Async Frameworks',
    },
    {
      id: 'k4',
      title: 'Incident Retrospectives with Psychological Safety Vectors',
      type: 'playbooks',
      author: 'Sarah Jenkins, PMP',
      readTime: '10 min read',
      downloads: '2.1k',
      summary: 'How to facilitate blameless retrospectives that convert system outages into organizational resilience and institutional knowledge.',
      tag: 'Resilience',
    },
  ];

  const filtered = articles.filter(a => {
    const matchesTab = activeTab === 'all' || a.type === activeTab;
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.summary.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white">
            Organizational Knowledge Hub
          </h1>
          <p className="text-xs md:text-sm text-[#ccc3d8]">
            Curated playbooks, architectural whitepapers, and operational frameworks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('learning-hub')}
            className="px-4 py-2.5 rounded-xl bg-[#191f2f] hover:bg-[#242a3a] border border-white/10 text-xs font-semibold text-[#dde2f8] flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">school</span>
            Linked Courses
          </button>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
          {(['all', 'frameworks', 'playbooks', 'whitepapers'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-[#7c3aed] text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                  : 'bg-[#191f2f] text-[#ccc3d8] hover:bg-[#242a3a]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-[#958da1] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources..."
            className="w-full bg-[#0d1322] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder-[#958da1] focus:outline-none focus:border-[#4cd7f6]"
          />
        </div>
      </div>

      {/* Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((art) => (
          <div
            key={art.id}
            className="bg-[#191f2f]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl flex flex-col justify-between hover:border-white/20 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#151b2b] text-[#4cd7f6] border border-white/10">
                  {art.tag}
                </span>
                <span className="text-[11px] text-[#958da1] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  {art.readTime}
                </span>
              </div>

              <h3 className="font-display font-bold text-white text-base md:text-lg group-hover:text-[#4cd7f6] transition-colors leading-snug">
                {art.title}
              </h3>
              <p className="text-xs text-[#ccc3d8] mt-3 leading-relaxed">
                {art.summary}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-[#958da1]">By {art.author}</span>
              <button
                onClick={() => alert(`Opening '${art.title}' reader...`)}
                className="px-4 py-2 bg-[#151b2b] hover:bg-[#242a3a] text-xs font-semibold text-[#acedff] rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <span>Read Resource</span>
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
