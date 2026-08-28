export type RoleType = 'learner' | 'trainer' | 'admin';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type ScreenView = 
  | 'signin'
  | 'signup-step1'
  | 'signup-step2'
  | 'signup-step3'
  | 'landing'
  | 'dashboard'
  | 'my-profile'
  | 'my-skills'
  | 'learning-hub'
  | 'ai-coach'
  | 'assessments'
  | 'knowledge-hub'
  | 'achievements'
  | 'settings';

export interface UserProfile {
  name: string;
  email: string;
  organization: string;
  department: string;
  role: string;
  userType: RoleType;
  experienceLevel: ExperienceLevel;
  interests: string[];
  careerGoal: string;
  completionRate: number;
  streakDays: number;
  skillsAdded: number;
  activeCoursesCount: number;
  achievementsCount: number;
  hoursLearned: number;
  competencyScore: number;
}

export interface Course {
  id: string;
  title: string;
  category: 'Leadership' | 'Soft Skills' | 'Management' | 'Technology' | 'Data Analytics' | 'Design';
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  image: string;
  instructor: string;
  instructorRole: string;
  description: string;
  tags: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  modules: {
    id: string;
    title: string;
    duration: string;
    completed: boolean;
  }[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  proficiency: number; // 0 to 100
  level: 'Novice' | 'Competent' | 'Proficient' | 'Expert';
  verified: boolean;
  coursesCount: number;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  tier: 'Gold' | 'Silver' | 'Bronze' | 'Diamond';
  category: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  timeAgo: string;
  type: 'completed' | 'started' | 'badge' | 'assessment';
  icon: string;
  iconBg: string;
}

export interface Assessment {
  id: string;
  title: string;
  category: string;
  questionsCount: number;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  score?: number;
  completed?: boolean;
}
