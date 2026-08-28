import React, { useState } from 'react';
import { ScreenView, UserProfile, Course, SkillItem } from './types';
import {
  INITIAL_USER,
  INITIAL_COURSES,
  INITIAL_SKILLS,
  INITIAL_ACTIVITIES,
  INITIAL_ACHIEVEMENTS,
  INITIAL_ASSESSMENTS,
} from './data/mockData';

// Components
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CourseModal } from './components/CourseModal';
import { DemoSwitcher } from './components/DemoSwitcher';

// Views
import { LandingView } from './views/LandingView';
import { SignInView } from './views/SignInView';
import { SignUpStep1View } from './views/SignUpStep1View';
import { SignUpStep2View } from './views/SignUpStep2View';
import { SignUpStep3View } from './views/SignUpStep3View';
import { DashboardView } from './views/DashboardView';
import { MyProfileView } from './views/MyProfileView';
import { MySkillsView } from './views/MySkillsView';
import { LearningHubView } from './views/LearningHubView';
import { AICoachView } from './views/AICoachView';
import { AssessmentsView } from './views/AssessmentsView';
import { KnowledgeHubView } from './views/KnowledgeHubView';
import { AchievementsView } from './views/AchievementsView';
import { SettingsView } from './views/SettingsView';

export function App() {
  const [currentView, setCurrentView] = useState<ScreenView>('dashboard');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [skills, setSkills] = useState<SkillItem[]>(INITIAL_SKILLS);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [achievements] = useState(INITIAL_ACHIEVEMENTS);
  const [assessments] = useState(INITIAL_ASSESSMENTS);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleUpdateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const handleLogin = (email: string) => {
    setUser((prev) => ({ ...prev, email }));
    setCurrentView('dashboard');
  };

  const handleAddSkill = (newSkill: SkillItem) => {
    setSkills((prev) => [newSkill, ...prev]);
    setUser((prev) => ({
      ...prev,
      skillsAdded: prev.skillsAdded + 1,
    }));
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        title: `Added new skill: ${newSkill.name}`,
        timeAgo: 'Just now',
        type: 'completed',
        icon: 'history_edu',
        iconBg: 'bg-primary-container',
      },
      ...prev,
    ]);
  };

  const handleUpdateCourseProgress = (courseId: string, completedModuleId: string) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id !== courseId) return course;

        const updatedModules = course.modules.map((mod) =>
          mod.id === completedModuleId ? { ...mod, completed: !mod.completed } : mod
        );
        const completedCount = updatedModules.filter((m) => m.completed).length;
        const progress = Math.round((completedCount / course.totalLessons) * 100);

        const updated = {
          ...course,
          modules: updatedModules,
          completedLessons: completedCount,
          progress,
        };

        if (selectedCourse && selectedCourse.id === courseId) {
          setSelectedCourse(updated);
        }

        return updated;
      })
    );
  };

  // Full-page views without app shell
  const isAuthOrLanding = [
    'signin',
    'signup-step1',
    'signup-step2',
    'signup-step3',
    'landing',
  ].includes(currentView);

  return (
    <div className="min-h-screen bg-[#0d1322] text-[#dde2f8] font-sans antialiased selection:bg-purple-500/30 selection:text-white">
      {isAuthOrLanding ? (
        <main className="w-full min-h-screen">
          {currentView === 'landing' && <LandingView onNavigate={setCurrentView} />}
          {currentView === 'signin' && (
            <SignInView
              onNavigate={setCurrentView}
              onLogin={handleLogin}
              user={user}
            />
          )}
          {currentView === 'signup-step1' && (
            <SignUpStep1View
              onNavigate={setCurrentView}
              user={user}
              onUpdateUser={handleUpdateUser}
            />
          )}
          {currentView === 'signup-step2' && (
            <SignUpStep2View
              onNavigate={setCurrentView}
              user={user}
              onUpdateUser={handleUpdateUser}
            />
          )}
          {currentView === 'signup-step3' && (
            <SignUpStep3View
              onNavigate={setCurrentView}
              user={user}
              onUpdateUser={handleUpdateUser}
            />
          )}
        </main>
      ) : (
        /* Authenticated App Shell with Header & Sidebar */
        <div className="flex min-h-screen">
          <Sidebar
            currentView={currentView}
            onNavigate={setCurrentView}
            isOpenMobile={isMobileMenuOpen}
            onCloseMobile={() => setIsMobileMenuOpen(false)}
          />

          <div className="flex-1 flex flex-col min-w-0">
            <Header
              user={user}
              onNavigate={setCurrentView}
              onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />

            <main className="flex-1 pt-24 lg:pl-72 p-4 md:p-8 max-w-[1600px] w-full mx-auto">
              {currentView === 'dashboard' && (
                <DashboardView
                  user={user}
                  courses={courses}
                  activities={activities}
                  onNavigate={setCurrentView}
                  onOpenCourse={(c) => setSelectedCourse(c)}
                />
              )}

              {currentView === 'my-profile' && (
                <MyProfileView
                  user={user}
                  onUpdateUser={handleUpdateUser}
                  onNavigate={setCurrentView}
                />
              )}

              {currentView === 'my-skills' && (
                <MySkillsView
                  skills={skills}
                  onAddSkill={handleAddSkill}
                  onNavigate={setCurrentView}
                />
              )}

              {currentView === 'learning-hub' && (
                <LearningHubView
                  courses={courses}
                  onOpenCourse={(c) => setSelectedCourse(c)}
                  onNavigate={setCurrentView}
                />
              )}

              {currentView === 'ai-coach' && (
                <AICoachView user={user} onNavigate={setCurrentView} />
              )}

              {currentView === 'assessments' && (
                <AssessmentsView
                  assessments={assessments}
                  onNavigate={setCurrentView}
                />
              )}

              {currentView === 'knowledge-hub' && (
                <KnowledgeHubView onNavigate={setCurrentView} />
              )}

              {currentView === 'achievements' && (
                <AchievementsView
                  achievements={achievements}
                  onNavigate={setCurrentView}
                />
              )}

              {currentView === 'settings' && (
                <SettingsView
                  user={user}
                  onUpdateUser={handleUpdateUser}
                  onNavigate={setCurrentView}
                />
              )}
            </main>
          </div>
        </div>
      )}

      {/* Global Interactive Course Player Modal */}
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onUpdateProgress={handleUpdateCourseProgress}
        />
      )}

      {/* Floating Demo Screen Switcher */}
      <DemoSwitcher currentView={currentView} onNavigate={setCurrentView} />
    </div>
  );
}

export default App;
