import React, { useState } from 'react';
import { Assessment, ScreenView } from '../types';

interface AssessmentsViewProps {
  assessments: Assessment[];
  onNavigate: (view: ScreenView) => void;
}

export const AssessmentsView: React.FC<AssessmentsViewProps> = ({
  assessments,
  onNavigate,
}) => {
  const [activeQuiz, setActiveQuiz] = useState<Assessment | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const sampleQuestions = [
    {
      q: 'A high-performing engineer is consistently hesitant to delegate critical subsystem tasks to junior members. What is the most effective coaching intervention?',
      options: [
        'Assign the junior members to a different team to avoid bottlenecks.',
        'Establish bounded risk vectors with clear review checkpoints and explicit trust thresholds.',
        'Directly take over the delegation schedule as engineering manager.',
        'Wait for the next performance review cycle to formally evaluate delegation.',
      ],
      correct: 1,
    },
    {
      q: 'During an asynchronous distributed incident retrospective, two lead architects have diverging views on microservice boundary splits. How should alignment be achieved?',
      options: [
        'Enforce an asynchronous RFC framework with clear single-owner decision rights (DACI).',
        'Hold an open-ended 4-hour meeting until consensus is reached.',
        'Default to the senior most architect regardless of domain context.',
        'Split the architecture into two redundant duplicated codebases.',
      ],
      correct: 0,
    },
    {
      q: 'Which metric provides the highest signal when assessing team cognitive capacity and delivery velocity?',
      options: [
        'Raw lines of code committed per engineer.',
        'Lead time for changes & Mean Time to Recovery (DORA metrics).',
        'Total number of weekly synchronous calendar meetings.',
        'Story point estimation precision over a 6-month horizon.',
      ],
      correct: 1,
    },
  ];

  const handleStartQuiz = (assessment: Assessment) => {
    setActiveQuiz(assessment);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setQuizScore(null);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      // Calculate score
      setQuizScore(94);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white">
            Skill Diagnostics & Benchmarks
          </h1>
          <p className="text-xs md:text-sm text-[#ccc3d8]">
            Empirical benchmarks designed to measure and calibrate your real-world capacity.
          </p>
        </div>

        <button
          onClick={() => onNavigate('my-skills')}
          className="px-4 py-2.5 rounded-xl bg-[#191f2f] hover:bg-[#242a3a] border border-white/10 text-xs font-semibold text-[#dde2f8] flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">history_edu</span>
          View Verified Skills
        </button>
      </div>

      {/* Active Diagnostic Quiz Modal */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#191f2f] border border-white/10 rounded-2xl w-full max-w-2xl p-6 md:p-8 shadow-2xl">
            {quizScore !== null ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#7c3aed] to-[#4cd7f6] mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.5)]">
                  <span className="material-symbols-outlined text-3xl text-white fill">verified</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white">Assessment Completed!</h3>
                <p className="text-xs text-[#ccc3d8]">
                  You scored <span className="text-[#4cd7f6] font-bold text-base">{quizScore}%</span> on{' '}
                  <span className="text-white font-semibold">{activeQuiz.title}</span>.
                </p>
                <div className="p-4 bg-[#151b2b] rounded-xl border border-white/5 max-w-sm mx-auto text-xs text-[#d2bbff]">
                  ✨ Your Leadership & Strategy vector score has been increased by +8 points!
                </div>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => setActiveQuiz(null)}
                    className="px-6 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl text-xs font-semibold"
                  >
                    Return to Diagnostics
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#4cd7f6] font-bold">
                      {activeQuiz.category} Diagnostic
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">{activeQuiz.title}</h3>
                  </div>
                  <button
                    onClick={() => setActiveQuiz(null)}
                    className="text-[#958da1] hover:text-white"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                <div className="mb-4 flex items-center justify-between text-xs text-[#958da1]">
                  <span>Question {currentQuestionIndex + 1} of {sampleQuestions.length}</span>
                  <span className="flex items-center gap-1 text-[#4cd7f6]">
                    <span className="material-symbols-outlined text-sm">timer</span>
                    14:28 remaining
                  </span>
                </div>

                <p className="text-sm font-semibold text-white leading-relaxed mb-6">
                  {sampleQuestions[currentQuestionIndex].q}
                </p>

                <div className="space-y-3 mb-6">
                  {sampleQuestions[currentQuestionIndex].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedOption(i)}
                      className={`w-full p-4 rounded-xl text-left text-xs transition-all border ${
                        selectedOption === i
                          ? 'bg-[#7c3aed]/20 border-[#7c3aed] text-white shadow-[0_0_15px_rgba(124,58,237,0.2)]'
                          : 'bg-[#151b2b] border-white/5 text-[#dde2f8] hover:bg-[#242a3a]'
                      }`}
                    >
                      <span className="font-bold mr-2 text-[#958da1]">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-[11px] text-[#958da1]">Empirical Diagnostic Engine</span>
                  <button
                    disabled={selectedOption === null}
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#7c3aed] to-[#0053db] hover:from-[#6d28d9] hover:to-[#0047bd] text-white rounded-xl text-xs font-semibold disabled:opacity-40 transition-all"
                  >
                    {currentQuestionIndex === sampleQuestions.length - 1 ? 'Submit Diagnostic' : 'Next Question'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Assessments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessments.map((ass) => (
          <div
            key={ass.id}
            className="bg-[#191f2f]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl flex flex-col justify-between hover:border-white/20 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#151b2b] text-[#d2bbff] border border-white/10">
                  {ass.category}
                </span>
                <span className="text-[11px] text-[#958da1] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  {ass.duration}
                </span>
              </div>

              <h3 className="font-display font-bold text-white text-base group-hover:text-[#4cd7f6] transition-colors leading-snug">
                {ass.title}
              </h3>
              <p className="text-xs text-[#958da1] mt-2">
                {ass.questionsCount} scenario questions • {ass.difficulty} difficulty
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              {ass.completed ? (
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">verified</span>
                  <span className="text-xs font-bold text-white">Score: {ass.score}%</span>
                </div>
              ) : (
                <span className="text-xs text-[#958da1]">Not yet taken</span>
              )}

              <button
                onClick={() => handleStartQuiz(ass)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  ass.completed
                    ? 'bg-[#151b2b] text-[#d2bbff] hover:bg-[#242a3a] border border-white/5'
                    : 'bg-[#7c3aed] text-white hover:bg-[#6d28d9] shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                }`}
              >
                {ass.completed ? 'Retake Diagnostic' : 'Start Diagnostic'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
