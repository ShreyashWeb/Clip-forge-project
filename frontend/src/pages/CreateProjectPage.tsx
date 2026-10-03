import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Wand2,
  CheckCircle2,
  Lightbulb,
  Layers,
  MessageSquare,
  Clock,
  Compass,
  FileCheck
} from 'lucide-react';
import { VideoPlatform, VideoDuration, VideoTone } from '../types/project';
import { useProject } from '../context/ProjectContext';
import { aiService, AngleSuggestion } from '../services/aiService';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';

export const CreateProjectPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [topic, setTopic] = useState('Explain how AI agents are changing software development');
  const [isDiscoveringAngles, setIsDiscoveringAngles] = useState(false);
  const [suggestedAngles, setSuggestedAngles] = useState<AngleSuggestion[]>([]);
  const [selectedAngle, setSelectedAngle] = useState<string>('');
  const [customAngle, setCustomAngle] = useState('');
  
  // Production Config
  const [targetAudience, setTargetAudience] = useState('Software engineers, CS students, tech builders');
  const [platform, setPlatform] = useState<VideoPlatform>('YouTube Shorts');
  const [duration, setDuration] = useState<VideoDuration>('45 sec');
  const [tone, setTone] = useState<VideoTone>('Educational');
  const [language, setLanguage] = useState('English (US)');
  const [callToAction, setCallToAction] = useState('Follow for real AI architecture breakdowns that cut through the hype.');
  const [isBuildingBrief, setIsBuildingBrief] = useState(false);

  const { createProject, updateProjectBrief } = useProject();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleDiscoverAngles = async () => {
    if (!topic.trim()) {
      showToast({ type: 'warning', title: 'Topic Required', message: 'Please enter a video topic to discover angles.' });
      return;
    }

    setIsDiscoveringAngles(true);
    try {
      const angles = await aiService.generateAngles(topic);
      setSuggestedAngles(angles);
      if (angles.length > 0) {
        setSelectedAngle(angles[0].title);
      }
      setStep(2);
      showToast({ type: 'ai', title: '4 Angles Discovered', message: 'Choose your unique creator perspective.' });
    } catch (err) {
      showToast({ type: 'error', title: 'Discovery Failed', message: 'Could not generate angles.' });
    } finally {
      setIsDiscoveringAngles(false);
    }
  };

  const handleBuildProductionBrief = async () => {
    const finalAngle = customAngle.trim() || selectedAngle;
    if (!finalAngle) {
      showToast({ type: 'warning', title: 'Angle Required', message: 'Please pick an angle or type your own.' });
      return;
    }

    setIsBuildingBrief(true);
    try {
      // 1. Generate structured brief
      const brief = await aiService.generateBrief({
        topic,
        angle: finalAngle,
        audience: targetAudience,
        platform,
        duration,
        tone,
        cta: callToAction
      });

      // 2. Fetch initial research
      const research = await aiService.fetchResearch(topic, finalAngle);

      // 3. Create project with Brief & Research attached directly
      await createProject({
        title: topic,
        platform,
        duration,
        tone,
        status: 'RESEARCHING',
        brief,
        research,
      });

      showToast({ type: 'success', title: 'Production Brief Built!', message: 'Proceeding to AI Studio.' });
      navigate('/studio/brief');
    } catch (err) {
      showToast({ type: 'error', title: 'Brief Generation Failed', message: 'Could not generate production brief.' });
    } finally {
      setIsBuildingBrief(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Step Indicator Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson-950/80 border border-crimson-700/50 text-xs font-bold text-crimson-400">
          <Compass className="w-3.5 h-3.5" />
          <span>STAGE 01: CREATOR ANGLE DISCOVERY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-display">
          Forge a Unique Short Video Brief
        </h1>
        <p className="text-xs sm:text-sm text-forge-400 max-w-lg mx-auto">
          Generic AI tools produce generic scripts. ClipForge first nails your unique angle and research context.
        </p>
      </div>

      {/* STEP 1: Enter Topic & Trigger Angle Discovery */}
      {step === 1 && (
        <div className="bg-forge-900 border border-forge-700/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl glow-border">
          <div>
            <label className="block text-sm font-bold text-white font-display uppercase tracking-wider mb-2">
              1. What core topic or question do you want to deconstruct?
            </label>
            <textarea
              rows={4}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. 'Explain how AI coding agents test, debug, and ship pull requests autonomously in 2026.'"
              className="glass-input w-full text-base"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={handleDiscoverAngles}
              isLoading={isDiscoveringAngles}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Discover Unique Angles with AI
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: Choose Angle & Configure Brief */}
      {step === 2 && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Angle Selection Box */}
          <div className="bg-forge-900 border border-forge-700/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-forge-800">
              <div>
                <h2 className="text-lg font-bold text-white font-display">
                  What is your unique angle?
                </h2>
                <p className="text-xs text-forge-400">
                  Topic: <strong className="text-crimson-400">"{topic}"</strong>
                </p>
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-xs text-forge-400 hover:text-white underline"
              >
                Change Topic
              </button>
            </div>

            {/* 4 AI Suggested Angles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestedAngles.map((ang) => {
                const isSelected = selectedAngle === ang.title && !customAngle;
                return (
                  <div
                    key={ang.id}
                    onClick={() => {
                      setSelectedAngle(ang.title);
                      setCustomAngle('');
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-crimson-950/40 border-crimson-500 text-white shadow-glow-crimson ring-1 ring-crimson-500/50'
                        : 'bg-forge-850/80 border-forge-700/60 text-forge-300 hover:bg-forge-800 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-mono text-[10px] text-forge-400 uppercase font-bold">
                          Angle Option
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-crimson-400" />}
                      </div>
                      <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">
                        {ang.title}
                      </h3>
                      <p className="text-xs text-forge-400 leading-relaxed mb-3">
                        {ang.description}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-forge-950/90 border border-forge-800 text-[11px] text-purple-300 italic">
                      "Why this works: {ang.rationale}"
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Angle Option */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-forge-400 uppercase tracking-wider mb-1.5">
                Or Write Your Own Custom Angle:
              </label>
              <input
                type="text"
                value={customAngle}
                onChange={(e) => {
                  setCustomAngle(e.target.value);
                  if (e.target.value) setSelectedAngle('');
                }}
                placeholder="e.g. Focus on how junior vs senior developers use AI differently in 2026"
                className="glass-input w-full"
              />
            </div>
          </div>

          {/* Production Specification Parameters */}
          <div className="bg-forge-900 border border-forge-700/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white font-display pb-3 border-b border-forge-800">
              Production Specifications
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-1.5">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="glass-input w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-1.5">
                  Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as any)}
                  className="glass-input w-full"
                >
                  <option value="YouTube Shorts">YouTube Shorts (9:16)</option>
                  <option value="Instagram Reels">Instagram Reels (9:16)</option>
                  <option value="TikTok">TikTok (9:16)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-1.5">
                  Duration Target
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value as any)}
                  className="glass-input w-full"
                >
                  <option value="30 sec">30 seconds (Ultra-Fast Hook)</option>
                  <option value="45 sec">45 seconds (Balanced Explainer)</option>
                  <option value="60 sec">60 seconds (Comprehensive Deep-Dive)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-1.5">
                  Delivery Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value as any)}
                  className="glass-input w-full"
                >
                  <option value="Educational">Educational & Authoritative</option>
                  <option value="Conversational">Conversational & Engaging</option>
                  <option value="Storytelling">Storytelling & Suspenseful</option>
                  <option value="News">News & Breaking Analysis</option>
                  <option value="Professional">Professional Architect</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-1.5">
                  Call To Action (Outro)
                </label>
                <input
                  type="text"
                  value={callToAction}
                  onChange={(e) => setCallToAction(e.target.value)}
                  className="glass-input w-full"
                />
              </div>
            </div>

            {/* Build Brief CTA */}
            <div className="flex justify-end pt-4 border-t border-forge-800">
              <Button
                variant="primary"
                size="lg"
                onClick={handleBuildProductionBrief}
                isLoading={isBuildingBrief}
                icon={<FileCheck className="w-5 h-5" />}
              >
                Build Production Brief & Research
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
