export type ProjectStatus = 
  | 'IDEA' 
  | 'RESEARCHING' 
  | 'SCRIPT_READY' 
  | 'VOICE_READY' 
  | 'EDITING' 
  | 'RENDERING' 
  | 'COMPLETED';

export type VideoPlatform = 'YouTube Shorts' | 'Instagram Reels' | 'TikTok';
export type VideoDuration = '30 sec' | '45 sec' | '60 sec';
export type VideoTone = 'Educational' | 'Conversational' | 'Storytelling' | 'News' | 'Professional';

export interface ProjectBrief {
  id: string;
  projectId: string;
  title: string;
  topic: string;
  uniqueAngle: string;
  whyThisAngle: string;
  targetAudience: string;
  platform: VideoPlatform;
  duration: VideoDuration;
  tone: VideoTone;
  language: string;
  hookVariant: string;
  alternateHooks: string[];
  keyPillars: string[];
  callToAction: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResearchSource {
  id: string;
  projectId: string;
  title: string;
  publisher: string;
  url: string;
  publicationDate: string;
  sourceType: 'Academic Paper' | 'Industry Report' | 'Technical Article' | 'Official Doc' | 'Case Study';
  reliabilityStatus: 'VERIFIED' | 'NEEDS_REVIEW' | 'POTENTIALLY_UNSUPPORTED';
  credibilityScore: number; // 0 - 100
  snippet: string;
  keyTakeaways: string[];
}

export interface ClaimVerification {
  id: string;
  projectId: string;
  claimText: string;
  status: 'VERIFIED' | 'NEEDS_REVIEW' | 'POTENTIALLY_UNSUPPORTED' | 'USER_APPROVED';
  confidenceScore: number;
  reason: string;
  suggestedRewrite: string;
  sourceAttribution?: string;
  isApplied: boolean;
}

export interface ScriptSection {
  id: string;
  type: 'HOOK' | 'CONTEXT' | 'KEY_POINT_1' | 'KEY_POINT_2' | 'EXAMPLE' | 'CTA';
  title: string;
  content: string;
  estimatedSeconds: number;
  wordCount: number;
  suggestedBrollPrompt: string;
}

export interface ScriptData {
  id: string;
  projectId: string;
  title: string;
  sections: ScriptSection[];
  totalWords: number;
  estimatedDurationSeconds: number;
  readingSpeedWpm: number;
  lastAiSuggestion?: {
    action: string;
    diff: string;
    timestamp: string;
  };
}

export interface VoiceProfile {
  id: string;
  name: string;
  accent: string;
  gender: 'Male' | 'Female' | 'Neutral';
  style: string;
  sampleUrl: string;
  elevenLabsVoiceId: string;
  isPremium: boolean;
}

export interface VoiceoverSettings {
  voiceId: string;
  speed: number; // 0.5 - 2.0
  pitch: number; // -10 to +10
  emotion: 'Neutral' | 'Energetic' | 'Authoritative' | 'Empathetic' | 'Suspenseful';
  stability: number; // 0 - 100
  clarityBoost: number; // 0 - 100
  audioUrl?: string;
  generatedDurationSeconds?: number;
}

export interface MediaAsset {
  id: string;
  projectId?: string;
  title: string;
  fileName: string;
  type: 'video' | 'image' | 'audio';
  category: 'Videos' | 'Images' | 'Audio' | 'Generated' | 'Uploaded';
  url: string;
  thumbnailUrl: string;
  durationSeconds?: number;
  width?: number;
  height?: number;
  tags: string[];
  semanticMatchScore?: number; // 0 - 100
  scriptSentenceMatch?: string;
}

export interface TimelineTrackItem {
  id: string;
  trackType: 'VIDEO' | 'AUDIO' | 'VOICE' | 'CAPTIONS' | 'TEXT';
  assetId?: string;
  title: string;
  startTime: number; // in seconds
  duration: number; // in seconds
  sourceStartTime?: number;
  volume?: number;
  text?: string;
  style?: {
    color?: string;
    fontSize?: number;
    fontFamily?: string;
    positionY?: number;
    backgroundColor?: string;
    animation?: 'fade' | 'pop' | 'typewriter' | 'glow';
  };
}

export interface ProjectAnalytics {
  projectId: string;
  retentionSimulation: { second: number; percentage: number; industryAvg: number }[];
  hookStrengthScore: number; // 0 - 100
  informationDensityScore: number; // 0 - 100
  sourceCoveragePercentage: number; // 0 - 100
  aiContributionPercentage: number;
  humanEditCount: number;
  estimatedHoursSaved: number;
  predictedViralityScore: number;
}

export interface Project {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: ProjectStatus;
  platform: VideoPlatform;
  duration: VideoDuration;
  tone: VideoTone;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
  brief?: ProjectBrief;
  research?: {
    summary: string;
    keyFacts: string[];
    sources: ResearchSource[];
    claims: ClaimVerification[];
  };
  script?: ScriptData;
  voiceover?: VoiceoverSettings;
  assets?: MediaAsset[];
  timeline?: TimelineTrackItem[];
  renderProgress?: number;
  renderedVideoUrl?: string;
  analytics?: ProjectAnalytics;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'CREATOR' | 'PRO' | 'ENTERPRISE';
  avatarUrl?: string;
  token?: string;
}
